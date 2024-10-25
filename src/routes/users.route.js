const express = require('express');
const router = express.Router();

const { register } = require('../controllers/users.controller.js');

router.post('/register', register);
// router.post('/login', login);

module.exports = router;
