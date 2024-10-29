const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware.js');
const { currentUser } = require('../controllers/users.controller.js');

router.get('/user', auth, currentUser);

module.exports = router;
