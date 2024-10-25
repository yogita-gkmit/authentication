const User = require('../models/users.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// const signup = async (req, res) => {
// 	try {
// 		const { email, password } = req.body;

// 		if (userModel.findOne({ email })) {
// 			res.status(401).json({ message: 'Email already exists' });
// 		}
// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		const user = new userModel({ email, password: hashedPassword });
// 		await user.save();

// 		res.status(201).json({ message: 'User Successfully Created' });
// 	} catch (err) {
// 		console.log(err);
// 		res.status(400).json({ message: 'Error in Creating User' });
// 	}
// };

async function authUser(email, password, name, address) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = new User({ email, name, address, password: hashedPassword });
	await user.save();
}

module.exports = { authUser };
