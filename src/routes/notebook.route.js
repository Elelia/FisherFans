const express = require('express');
const router = express.Router();
const notebookController = require('../controllers/notebook.controller');
const Token = require('../../token');

// get all notebooks
router.get('/', notebookController.getAllNotebooks);

// create one notebook
router.post('/create', Token.authenticateToken, notebookController.createNotebook);

module.exports = router;