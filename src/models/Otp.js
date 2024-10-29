const mongoose = require('mongoose');

const Otp = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	otp: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

module.exports = mongoose.model('otp', Otp);
