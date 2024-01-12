const userModel = require('../models/user.model');

// Get all users
async function getAllUsers(req, res) {
  try {
    const rows = await userModel.getAllUsers();
    if(!rows) {
      res.status(404).json({
        success: false,
        message: 'Users not found',
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

// Create one user
async function createUser(req, res) {
  try {
    console.log(req.body);
    const result = await userModel.createUser(req.body);
    console.log(result);
    if(result) {
      res.status(201).json({
        success: true,
        message: 'User created successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User could not be created',
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// Delete one user
async function deleteUser(req, res) {
  try {
    const result = await userModel.deleteUser(req.params.id);
    if(result) {
      res.status(200).json({
        success: true,
        message: `User with id ${req.params.id} deleted successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `User with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser
}