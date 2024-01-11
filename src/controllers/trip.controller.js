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
    res.status(500).json(error);
  }
}

// Create one notebook page
async function createTrip(req, res) {
  try {
    const result = await tripModel.createTrip(req.body);
    console.log(result);
    if(result) {
      res.status(201).json({
        success: true,
        message: 'Trip created successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Trip could not be created',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllTrips,
  createTrip
}