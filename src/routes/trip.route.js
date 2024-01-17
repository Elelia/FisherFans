const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const Token = require('../session/token');

// get all trips
router.get('/', tripController.getAllTrips);

// create one trip
router.post('/', Token.authenticateToken, tripController.createTrip);

// delete one trip
router.delete('/:id', Token.authenticateToken, tripController.deleteTrip);

// update one trip
router.put('/:id', Token.authenticateToken, tripController.updateTrip);

// get one trip by user id
router.get('/:user_id', tripController.getTripByUser);

// get trip by type
router.get('/type/:type', tripController.getTripByType);

module.exports = router;