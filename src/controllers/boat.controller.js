const boatModel = require('../models/boat.model');
const userModel = require('../models/user.model');

// Get all boats
async function getAllBoats(req, res) {
  try {
    const rows = await boatModel.getAllBoats();
    if(rows.length === 0) {
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
    if(rows.length === 0) {
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

// create one boat
async function createBoat(req, res) {
  try {
    const autorized = false;
    const licence_number = await userModel.getBoatingLicenseNumberByUser(req.body.user_id);
    if (licence_number[0].boating_license_number) {
      autorized = true;
    }
    if(autorized) {
      const result = await boatModel.createBoat(req.body);
      if(result) {
        res.status(201).json({
          success: true,
          message: 'Boat created successfully',
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Boat could not be created',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'You need a boating license to create a boat',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// update one boat
async function updateBoat(req, res) {
  try {
    const result = await boatModel.updateBoat(req.body, req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: 'Boat updated successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Boat could not be updated',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// delete one boat
async function deleteBoat(req, res) {
  try {
    const result = await boatModel.deleteBoat(req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: 'Boat deleted successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Boat could not be deleted',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// get boat by brand
async function getBoatByBrand(req, res) {
  try {
    const rows = await boatModel.getBoatByBrand(req.params.brand);
    if(rows.length === 0) {
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

// get boat with bounding box
async function getBoatBoundingBox(req, res) {
  try {
    const rows = await boatModel.getBoatBoundingBox(req.params.minLatitude, req.params.maxLatitude, req.params.minLongitude, req.params.maxLongitude);
    if(rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Boat with bounding box not found',
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
  getBoatByUser,
  createBoat,
  updateBoat,
  deleteBoat,
  getBoatByBrand,
  getBoatBoundingBox
}