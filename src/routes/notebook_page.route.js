const express = require('express');
const router = express.Router();
const notebookPageController = require('../controllers/notebook_page.controller');
const Token = require('../../token');

// get all notebook pages
router.get('/', notebookPageController.getAllNotebookPages);

// create one notebook page
router.post('/create', Token.authenticateToken, notebookPageController.createNotebookPage);

// modify one notebook page
// router.put('/:id', Token.authenticateToken, notebookPageController.updateNotebookPage);

// delete one notebook page
// router.delete('/:id', Token.authenticateToken, notebookPageController.deleteNotebookPage);

module.exports = router;