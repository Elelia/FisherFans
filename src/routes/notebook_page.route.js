const express = require('express');
const router = express.Router();
const notebookPageController = require('../controllers/notebook_page.controller');
const Token = require('../session/token');

// get all notebook pages
router.get('/', notebookPageController.getAllNotebookPages);

// create one notebook page
router.post('/', Token.authenticateToken, notebookPageController.createNotebookPage);

// modify one notebook page
router.put('/:id', Token.authenticateToken, notebookPageController.updateNotebookPage);

// delete one notebook page
router.delete('/:id', Token.authenticateToken, notebookPageController.deleteNotebookPage);

// get notebook page by user
router.get('/user/:id', notebookPageController.getNotebookPageByUser);

module.exports = router;