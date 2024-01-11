const boatModel = require('../models/boat.model');

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
  getBoatByUser
}