const notebookPageModel = require('../models/notebook_page.model');

// Get all notebooks
async function getAllNotebookPages(req, res) {
  try {
    const rows = await notebookPageModel.getAllNotebookPages();
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Notebooks not found',
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

// Create one notebook page
async function createNotebookPage(req, res) {
  try {
    const result = await notebookPageModel.createNotebookPage(req.body);
    if(result) {
      res.status(201).json({
        success: true,
        message: 'Notebook created successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Notebook could not be created',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllNotebookPages,
  createNotebookPage
}