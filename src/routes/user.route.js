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

// update one user
// router.put('/:id', Token.authenticateToken, userController.updateUser);

// get user by city
router.get('/city/:city', Token.authenticateToken, userController.getUserByCity);

module.exports = router;