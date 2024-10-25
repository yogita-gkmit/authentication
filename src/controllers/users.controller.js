const { authUser } = require('../services/users.service.js');
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

module.exports = { register };
