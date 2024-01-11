const Token = require('../../token');

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

async function test (req, res) {
  try {
    res.status(200).json({
      success: true,
      message: 'Good job'
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getToken,
  test
}