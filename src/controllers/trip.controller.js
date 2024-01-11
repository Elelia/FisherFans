const tripModel = require('../models/trip.model');

// Get all trips
async function getAllTrips(req, res) {
  try {
    const rows = await tripModel.getAllTrips();
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Trips not found',
      });
    } else {
      res.status(200).json({
        success: true,
        results: rows
      });
    }
  } catch (error) {
    console.log("Coucou c'est moi");
    res.status(500).json(error);
  }
}

// Create one trip
async function createTrip(req, res) {
	
}

// Delete one trip
async function deleteTrip(req, res) {
  try {
    const result = await tripModel.deleteTrip(req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: `Trip with id ${req.params.id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Trip with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllTrips,
  createTrip,
  deleteTrip
}