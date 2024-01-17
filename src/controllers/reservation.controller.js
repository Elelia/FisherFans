const reservationModel = require('../models/reservation.model');

// Get all trips
async function getAllReservations(req, res) {
  try {
    const rows = await reservationModel.getAllReservations();
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Rservations not found',
      });
    } else {
      res.status(200).json({
        success: true,
        results: rows
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// Create one reservation
async function createReservation(req, res) {
  try {
    const result = await reservationModel.createReservation(req.body);
    if(result) {
      res.status(201).json({
        success: true,
        message: 'Reservation created successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Reservation could not be created',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// delete one reservation
async function deleteReservation(req, res) {
  try {
    const result = await reservationModel.deleteReservation(req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: 'Reservation deleted successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Reservation could not be deleted',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// get reservation by user
async function getReservationByUser(req, res) {
  try {
    const rows = await reservationModel.getReservationByUser(req.params.id);
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    } else {
      res.status(200).json({
        success: true,
        results: rows
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// get reservation by price
async function getReservationByPrice(req, res) {
  try {
    const rows = await reservationModel.getReservationByPrice(req.params.price);
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    } else {
      res.status(200).json({
        success: true,
        results: rows
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// update one reservation
async function updateReservation(req, res) {
  try {
    const result = await reservationModel.updateReservation(req.body, req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: 'Reservation updated successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Reservation could not be updated',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllReservations,
  createReservation,
  deleteReservation,
  getReservationByUser,
  getReservationByPrice,
  updateReservation
}