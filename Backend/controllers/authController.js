// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const OTP = require('../models/otpModel');
// const twilio = require('twilio');

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// exports.login = async (req, res) => {
//     const { mobile_number, password } = req.body;

//     try {
//         const user = await User.findByMobileNumber(mobile_number);

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         await OTP.create({ mobile_number, otp, expires_at: new Date(Date.now() + 5 * 60000) });

//         // Send OTP via Twilio
//         await client.messages.create({
//             body: `Your OTP is: ${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: mobile_number
//         });

//         res.status(200).json({ message: 'OTP sent successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to login', error });
//     }
// };

// exports.verifyOTP = async (req, res) => {
//    const { mobile_number, otp } = req.body;

//    //const {mobile_number} = req.body;

//     try {
//         const otpRecord = await OTP.findValidOTP(mobile_number, otp);

//         if (!otpRecord) {
//             return res.status(400).json({ message: 'Invalid OTP' });
//         }

//         const user = await User.findByMobileNumber(mobile_number);
//         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Delete the OTP after successful verification
//         await OTP.delete(mobile_number);

//         res.status(200).json({ token });
//     } 
//     catch (error) {
//         res.status(500).json({ message: 'Failed to verify OTP', error });
//     }
// };

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const OTP = require('../models/otpModel');
// const twilio = require('twilio');

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // Signup for new users (with OTP verification)
// exports.signup = async (req, res) => {
//     const { first_name, last_name, email, mobile_number, emp_number, password, role, department_id, supervisor_id } = req.body;

//     try {
//         // Check if the user already exists
//         const userExists = await User.exists(mobile_number);
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         await OTP.create({ mobile_number, otp, expires_at: new Date(Date.now() + 5 * 60000) });

//         // Send OTP via Twilio
//         await client.messages.create({
//             body: `Your OTP is: ${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: mobile_number
//         });

//         res.status(200).json({ message: 'OTP sent successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to sign up', error });
//     }
// };

// // Verify OTP and create user
// exports.verifyOTP = async (req, res) => {
//     const { first_name, last_name, email, mobile_number, emp_number, password, role, department_id, supervisor_id, otp } = req.body;

//     try {
//         // Verify OTP
//         const otpRecord = await OTP.findValidOTP(mobile_number, otp);
//         if (!otpRecord) {
//             return res.status(400).json({ message: 'Invalid OTP' });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create the user
//         const user = await User.create({
//             first_name,
//             last_name,
//             email,
//             mobile_number,
//             emp_number,
//             password: hashedPassword,
//             role,
//             department_id,
//             supervisor_id
//         });

//         // Delete the OTP after successful verification
//         await OTP.delete(mobile_number);

//         res.status(201).json({ message: 'User created successfully', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to verify OTP', error });
//     }
// };

// // Login for existing users (no OTP verification)
// exports.login = async (req, res) => {
//     const { mobile_number, password } = req.body;

//     try {
//         const user = await User.findByMobileNumber(mobile_number);

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to login', error });
//     }
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const OTP = require('../models/otpModel');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Signup for new users (with OTP verification)
exports.signup = async (req, res) => {
    const { first_name, last_name, email, mobile_number, emp_number, password, role, department_id, supervisor_id } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.exists(mobile_number);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.create({ mobile_number, otp, expires_at: new Date(Date.now() + 5 * 60000) });

        // Send OTP via Twilio
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile_number
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Failed to sign up', error: error.message });
    }
};

// Verify OTP and create user
exports.verifyOTP = async (req, res) => {
    const { first_name, last_name, email, mobile_number, emp_number, password, role, department_id, supervisor_id, otp } = req.body;

    try {
        // Verify OTP
        const otpRecord = await OTP.findValidOTP(mobile_number, otp);
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({
            first_name,
            last_name,
            email,
            mobile_number,
            emp_number,
            password: hashedPassword,
            role,
            department_id,
            supervisor_id
        });

        // Delete the OTP after successful verification
        await OTP.delete(mobile_number);

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
    }
};

// Login for existing users
exports.login = async (req, res) => {
    const { mobile_number, password } = req.body;

    // Input validation
    if (!mobile_number || !password) {
        return res.status(400).json({ message: 'Mobile number and password are required' });
    }

    try {
        // Find the user by mobile number
        const user = await User.findByMobileNumber(mobile_number);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Failed to login', error: error.message });
    }
};