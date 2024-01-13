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

// Update one trip
async function updateTrip(req, res) {
  try {
    const result = await tripModel.updateTrip(req.body, req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: `Trip with id ${req.params.id} updated successfully`,
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

// Get one trip by user id
async function getTripByUser(req, res) {
  try {
    const rows = await tripModel.getTripByUser(req.params.user_id);
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Trip not found',
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

// Get trip by type
async function getTripByType(req, res) {
  try {
    const rows = await tripModel.getTripByType(req.params.type);
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Trip not found',
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

module.exports = {
  getAllTrips,
  createTrip,
  deleteTrip,
  updateTrip,
  getTripByUser,
  getTripByType
}