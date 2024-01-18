const Token = require('../session/token');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

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

// login user
async function login (req, res) {
  try {
    let valid = false;
    const { email, password } = req.body;
    const hash = await userModel.getPasswordByEmail(email);
    const db_password = hash[0].password;
    valid = await bcrypt.compare(password, db_password);
    if(!valid) {
      res.status(404).json({
        success: false,
        message: 'Wrong email or password',
      });
    } else {
      const result = await userModel.login(email, db_password);
      if(result.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Wrong email or password',
        });
      } else {
        const { id, last_name, first_name, email } = result[0];
        const user = { id, last_name, first_name, email };
        const token = Token.generateToken(user);
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
            user: user,
            token
          });
        }
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