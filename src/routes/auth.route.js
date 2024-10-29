const express = require('express');
const router = express.Router();

const {
	register,
	login,
	logout,
	sendOtp,
	otpVerification,
} = require('../controllers/auth.controller.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-otp', otpVerification);
router.post('/send-otp', sendOtp);

module.exports = router;
