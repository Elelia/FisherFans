const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication.controller');
const Token = require('../session/token');

// get token
router.post('/token', authenticationController.getToken);

// login to get token
router.post('/login', authenticationController.login);

module.exports = router;