const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const Token = require('../../token');

// get all notebook pages
router.get('/', tripController.getAllTrips);

// create one notebook page
router.post('/', Token.authenticateToken, tripController.createTrip);

module.exports = router;