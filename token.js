const jwt = require('jsonwebtoken');

require('dotenv').config();

//génère un token à la connection de l'utilisateur
function generateToken() {
  // const { id, nom, prenom, mail, admin } = user;
  const payload = {
    "id": 1,
    "nom": "Doe",
    "prenom": "John"
  };
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5h' });
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

function setTokenCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    Secure: false
    //sameSite: 'Strict',
    //maxAge: 3600000
  });
}

function clearTokenCookie(req, res) {
  try {
    res.clearCookie('token');
  } catch(error) {
    res.status(500).send(error);
  }
}

module.exports = {
  generateToken,
  authenticateToken,
  setTokenCookie,
  clearTokenCookie
};