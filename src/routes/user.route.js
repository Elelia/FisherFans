const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const Token = require('../../token');

// get all users
router.get('/', Token.authenticateToken, userController.getAllUsers);

// create one user
router.post('/', Token.authenticateToken, userController.createUser);

// delete one user
router.delete('/:id', Token.authenticateToken, userController.deleteUser);

module.exports = router;