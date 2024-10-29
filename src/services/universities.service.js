const axios = require('axios');
const { validateUser } = require('../validators/auth.validator.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function list() {
	const universitiesList = await axios.get(
		'http://universities.hipolabs.com/search?country=India',
	);

	return universitiesList.data;
}

module.exports = { list };
