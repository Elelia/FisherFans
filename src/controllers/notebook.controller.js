const notebookModel = require('../models/notebook.model');

// Get all notebooks
async function getAllNotebooks(req, res) {
  try {
    const rows = await notebookModel.getAllNotebooks();
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

// Create one notebook
async function createNotebook(req, res) {
  try {
    console.log(req.body);
    const result = await notebookModel.createNotebook(req.body);
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
  getAllNotebooks,
  createNotebook
}