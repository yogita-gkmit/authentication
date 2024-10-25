const Users = require('../models/users.model.js');
const { validateUser } = require('../validators/users.validator.js');
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

module.exports = { authUser, authUserLogin };
