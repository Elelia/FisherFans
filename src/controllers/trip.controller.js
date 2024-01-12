const tripModel = require('../models/trip.model');
const boatModel = require('../models/boat.model');

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

// Create one trip
async function createTrip(req, res) {
  try {
    var owner = false;
    const boats = await boatModel.getBoatByUser(req.body.creator_id);
    for (var i = 0; i < boats.length; i++) {
      if (boats[i].id == req.body.boat_id) {
        owner = true;
      }
    }
    if(owner) {
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
    } else {
      res.status(400).json({
        success: false,
        message: 'You are not the owner of this boat',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// Delete one trip
async function deleteTrip(req, res) {
  try {
    const result = await tripModel.deleteTrip(req.body.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: `Trip with id ${req.body.id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Trip with id ${req.body.id} not found`,
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