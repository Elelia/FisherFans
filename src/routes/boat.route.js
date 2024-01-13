const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boat.controller');
const Token = require('../../token');

// get all boats
router.get('/', boatController.getAllBoats);

// get boats by id user
router.get('/:id', boatController.getBoatByUser);

// create one boat
router.post('/', Token.authenticateToken, boatController.createBoat);

// update one boat
router.put('/:id', Token.authenticateToken, boatController.updateBoat);

// delete one boat
router.delete('/:id', Token.authenticateToken, boatController.deleteBoat);

// get boat by brand
router.get('/brand/:brand', boatController.getBoatByBrand);

module.exports = router;    