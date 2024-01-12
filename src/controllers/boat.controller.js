const boatModel = require('../models/boat.model');

// Get all boats
async function getAllBoats(req, res) {
  try {
    const rows = await boatModel.getAllBoats();
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Boats not found',
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

// Get boat by id user
async function getBoatByUser(req, res) {
  try {
    const rows = await boatModel.getBoatByUser(req.params.id);
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Boat not found',
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
  getAllBoats,
  getBoatByUser
}