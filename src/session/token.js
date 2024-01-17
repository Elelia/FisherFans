const jwt = require('jsonwebtoken');

require('dotenv').config();

//génère un token à la connection de l'utilisateur
function generateToken(user) {
  console.log(user);
  if(!user) {
    user = {
      "id": null,
      "last_name": null,
      "first_name": null,
      "email": null
    };
  }
  const { id, last_name, first_name, email } = user;
  const payload = { id, last_name, first_name, email };
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  return accessToken;
}

//function to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if(authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if(err) {
        //403 c'est quand on a un token mais qu'il n'est pas bon
        return res.status(403).json("Your token is incorrect");
      }
      next();
    })
  } else {
    //401 c'est quand on n'a pas le token
    res.status(401).json("You don't have any token");
  }
}

// Set token in cookie
function setTokenCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    Secure: false,
    //sameSite: 'Strict',
    maxAge: 3600000
  });
}

module.exports = {
  generateToken,
  authenticateToken,
  setTokenCookie
};