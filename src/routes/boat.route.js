const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boat.controller');
const Token = require('../../token');

// get all boats
router.get('/', boatController.getAllBoats);

// get boats by id user
router.get('/:id', boatController.getBoatByUser);

// create one boat

module.exports = router;    