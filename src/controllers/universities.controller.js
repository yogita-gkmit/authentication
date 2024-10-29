const { list } = require('../services/universities.service.js');

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

module.exports = { universities };
