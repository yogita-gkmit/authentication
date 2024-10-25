const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware.js');
const {
	register,
	login,
	logout,
	currentUser,
	universities,
} = require('../controllers/users.controller.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/user', auth, currentUser);
router.get('/universities', auth, universities);

module.exports = router;
