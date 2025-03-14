// const express = require('express');
// const authController = require('../controllers/authController');

// const router = express.Router();

// // Login with mobile number and password
// router.post('/login', authController.login);

// // Verify OTP
// router.post('/verify-otp', authController.verifyOTP);

// module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Signup for new users (with OTP verification)
router.post('/signup', authController.signup);
router.post('/verify-otp', authController.verifyOTP);

// Login for existing users (no OTP verification)
router.post('/login', authController.login);

module.exports = router;