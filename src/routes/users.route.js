const express = require('express');
const router = express.Router();

const {
	register,
	login,
	logout,
	currentUser,
} = require('../controllers/users.controller.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/user', currentUser);

module.exports = router;
