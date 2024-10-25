const {
	authUser,
	authUserLogin,
	list,
} = require('../services/users.service.js');
// const Users = require('../models/users.model.js');
const { validateUser } = require('../validators/users.validator.js');

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

async function currentUser(req, res) {
	res.json(req.user);
}

async function universities(req, res) {
	try {
		const response = await list();
		res.send(response);
	} catch (err) {
		/* istanbul ignore next */
		console.log(err.message);
		/* istanbul ignore next */
		res.status(400).json({ message: err.message });
	}
}

module.exports = { register, login, logout, currentUser, universities };
