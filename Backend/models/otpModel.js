// // const db = require('../config/db');

// // class OTP {
// //     static async create(otp) {
// //         const { mobile_number, otp, expires_at } = otp;
// //         const [result] = await db.execute(
// //             'INSERT INTO otps (mobile_number, otp, expires_at) VALUES (?, ?, ?)',
// //             [mobile_number, otp, expires_at]
// //         );
// //         return result;
// //     }

// //     static async findValidOTP(mobile_number, otp) {
// //         const [rows] = await db.execute(
// //             'SELECT * FROM otps WHERE mobile_number = ? AND otp = ? AND expires_at > NOW()',
// //             [mobile_number, otp]
// //         );
// //         return rows[0];
// //     }

// //     static async delete(mobile_number) {
// //         const [result] = await db.execute('DELETE FROM otps WHERE mobile_number = ?', [mobile_number]);
// //         return result;
// //     }
// // }

// // module.exports = OTP;

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
//     const { mobile_number, otp } = req.body;

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
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to verify OTP', error });
//     }
// };

const db = require('../config/db');

class OTP {
    static async create(otpData) { // Use a different variable name for the parameter
        const { mobile_number, otp, expires_at } = otpData; // Destructure the parameter
        const [result] = await db.execute(
            'INSERT INTO otps (mobile_number, otp, expires_at) VALUES (?, ?, ?)',
            [mobile_number, otp, expires_at]
        );
        return result;
    }

    static async findValidOTP(mobile_number, otp) {
        const [rows] = await db.execute(
            'SELECT * FROM otps WHERE mobile_number = ? AND otp = ? AND expires_at > NOW()',
            [mobile_number, otp]
        );
        return rows[0];
    }

    static async delete(mobile_number) {
        const [result] = await db.execute('DELETE FROM otps WHERE mobile_number = ?', [mobile_number]);
        return result;
    }
}

module.exports = OTP;