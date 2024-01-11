const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication.controller');
const Token = require('../../token');

// login route to get token
router.post('/login', authenticationController.getToken);

// test route to check token
router.get('/secure', Token.authenticateToken, authenticationController.test);

module.exports = router;