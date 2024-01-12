const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const Token = require('../../token');

// get all trips
router.get('/', reservationController.getAllReservations);

// create one trip
router.post('/', Token.authenticateToken, reservationController.createReservation);

// delete one trip
router.delete('/', Token.authenticateToken, reservationController.deleteReservation);

module.exports = router;