const Token = require('../session/token');
const userModel = require('../models/user.model');

require('dotenv').config();

// get token
async function getToken (req, res) {
  try {
    const token = Token.generateToken();
  
    Token.setTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
}

// login
async function login (req, res) {
  try {
    const { email, password } = req.body;
    const result = await userModel.login(email, password);
    if(result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Wrong email or password',
      });
    } else {
      const token = Token.generateToken(result[0]);
      Token.setTokenCookie(res, token);
      if(token === undefined) {
        res.status(500).json({
          success: false,
          message: 'Token not generated',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Login successful',
          user: result[0],
          token
        });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getToken,
  login
}