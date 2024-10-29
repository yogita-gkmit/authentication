const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware.js');
const { universities } = require('../controllers/universities.controller.js');

router.get('/universities', auth, universities);

module.exports = router;
