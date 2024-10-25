const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware.js');
const {
	register,
	login,
	logout,
	currentUser,
} = require('../controllers/users.controller.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/user', auth, currentUser);

module.exports = router;
