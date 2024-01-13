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

// Update one notebook page
async function updateNotebookPage(req, res) {
  try {
    console.log(req.body);
    const result = await notebookPageModel.updateNotebookPage(req.body, req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: 'Notebook updated successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Notebook could not be updated',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// delete one notebook page
async function deleteNotebookPage(req, res) {
  try {
    const result = await notebookPageModel.deleteNotebookPage(req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: 'Notebook deleted successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Notebook could not be deleted',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllNotebookPages,
  createNotebookPage,
  updateNotebookPage,
  deleteNotebookPage
}