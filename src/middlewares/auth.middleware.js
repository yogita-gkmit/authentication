const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports.auth = async (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) {
		res.status(401).send('Access Denied');
	}
	try {
		const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verifyToken;
		next();
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid Token');
	}
};
