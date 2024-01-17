const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boat.controller');
const Token = require('../session/token');

// get all boats
router.get('/', boatController.getAllBoats);

// get boats by id user
router.get('/user/:id', boatController.getBoatByUser);

// create one boat
router.post('/', Token.authenticateToken, boatController.createBoat);

// update one boat
router.put('/:id', Token.authenticateToken, boatController.updateBoat);

// delete one boat
router.delete('/:id', Token.authenticateToken, boatController.deleteBoat);

// get boat by brand
router.get('/brand/:brand', boatController.getBoatByBrand);

// get boat by bounding box
router.get('/boundingbox/:minLatitude/:maxLatitude/:minLongitude/:maxLongitude', boatController.getBoatBoundingBox);

module.exports = router;