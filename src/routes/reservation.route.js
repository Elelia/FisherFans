const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const Token = require('../../token');

// get all trips
router.get('/', reservationController.getAllReservations);

// create one trip
router.post('/', Token.authenticateToken, reservationController.createReservation);

// delete one trip
router.delete('/:id', Token.authenticateToken, reservationController.deleteReservation);

// get reservation by user
router.get('/user/:id', reservationController.getReservationByUser);

// get reservation by price
router.get('/price/:price', reservationController.getReservationByPrice);

// update one reservation
router.put('/:id', Token.authenticateToken, reservationController.updateReservation);


module.exports = router;