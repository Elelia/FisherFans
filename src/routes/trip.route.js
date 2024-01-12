const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const Token = require('../../token');

// get all trips
router.get('/', tripController.getAllTrips);

// create one trip
router.post('/', Token.authenticateToken, tripController.createTrip);

// delete one trip
router.delete('/', Token.authenticateToken, tripController.deleteTrip);

module.exports = router;