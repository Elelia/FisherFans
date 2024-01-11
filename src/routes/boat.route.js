const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boat.controller');
const Token = require('../../token');

// get all trips
router.get('/:id', boatController.getBoatByUser);

module.exports = router;    