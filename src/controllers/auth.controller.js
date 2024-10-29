const {
	authUser,
	authUserLogin,
	EmailAndOtp,
	verify,
} = require('../services/auth.service.js');
// const User = require('../models/Users.js');
const OTP = require('../models/Otp.js');
const { validateUser } = require('../validators/auth.validator.js');
const otpGenerator = require('otp-generator');
const transporter = require('../helpers/auth.helper.js');
const Users = require('../models/Users.js');
const jwt = require('jsonwebtoken');

async function register(req, res) {
	try {
		const { email, password, name, address } = req.body;
		if (await validateUser(email)) {
			res.status(401).json({ message: 'Email already exists' });
		}
		await authUser(email, password, name, address);
		res.status(200).json({ message: `User has been successfully created` });
	} catch (err) {
		/* istanbul ignore next */
		console.log(err.message);
		/* istanbul ignore next */
		res.status(400).json({ message: err.message });
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body;

		const token = await authUserLogin(email, password);

		// res.header('Authorization', token).cookie("accessToken", accessToken, options).send({ token });
		res.header('Authorization', token).send({ token });
	} catch (err) {
		/* istanbul ignore next */
		console.log(err.message);
		/* istanbul ignore next */
		res.status(400).json({ message: err.message });
	}
}

async function logout(req, res) {
	try {
		res.send('user logout successfully');
	} catch (err) {
		/* istanbul ignore next */
		console.log(err.message);
		/* istanbul ignore next */
		res.status(400).json({ message: err.message });
	}
}

async function otpVerification(req, res) {
	try {
		const { email, otp } = req.body;
		const token = await verify(email, otp);

		res.status(200).json({ message: 'User verified successfully', token });
	} catch (error) {
		console.log('Error occurred while sending email: ', error);
		throw error;
	}
}

async function sendOtp(req, res) {
	try {
		const { email } = req.body;

		// Check if the user is already registered
		// if (await validateUser(email)) {
		// 	return res.status(401).json({ message: 'User is already registered' });
		// }

		const otpSent = await EmailAndOtp(email);

		// Send success response
		res.status(200).json({
			success: true,
			message: 'OTP sent successfully',
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: err.message });
	}
}

module.exports = {
	register,
	login,
	logout,
	sendOtp,
	otpVerification,
};
