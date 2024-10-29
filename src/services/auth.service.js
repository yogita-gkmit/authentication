const Users = require('../models/Users.js');
const otpGenerator = require('otp-generator');
const { validateUser } = require('../validators/auth.validator.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OTP = require('../models/Otp.js');
const transporter = require('../helpers/auth.helper.js');
const dotenv = require('dotenv');
dotenv.config();

async function authUser(email, password, name, address) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = new Users({ email, name, address, password: hashedPassword });
	await user.save();
}

async function authUserLogin(email, password) {
	const user = await Users.findOne({ email });

	if (!(await validateUser(email))) {
		res.status(401).json({ message: 'User does not exists' });
	}

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		return res.status(401).json({ message: 'Invalid Password' });
	}

	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
	// res.header('Authorization', token).send({ token });
	return token;
}

async function verify(email, otp) {
	const otpRecord = await OTP.findOne({ email, otp });
	if (!otpRecord) throw new Error('Invalid or expired OTP');
	const user = await Users.findOne({ email: email });
	console.log(user);

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	});
	console.log(token);

	// await OTP.deleteOne({ email, otp });
	return token;
}

async function generateOtp() {
	let otp = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	});

	return otp;
}

async function EmailAndOtp(email) {
	// Generate a unique OTP
	// let isUnique = false;

	// while (!isUnique) {
	const otp = await generateOtp();
	// const existingOtp = await OTP.findOne({ otp });

	// If OTP is unique, break the loop
	// isUnique = !existingOtp;
	// }

	const otpPayload = { email, otp };
	await OTP.create(otpPayload); // Ensure this returns a promise

	// await sendVerificationEmail(email, otp);

	await transporter.sendMail({
		from: process.env.MAIL_USER,
		to: email,
		subject: 'OTP for Registration',
		text: `Your OTP is ${otp}. It expires in 5 minutes.`,
	});

	return otpPayload;
}

module.exports = {
	authUser,
	authUserLogin,
	generateOtp,
	verify,
	EmailAndOtp,
};
