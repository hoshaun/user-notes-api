require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
  return jwt.sign({username: username}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

function verifyToken(req, res, next) {
  const token = req.session.token;
  
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).send("Invalid token");
  }
}

const isAlphanumeric = function(str) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(str);
};

const hasWhitespace = function(str) {
  return str.indexOf(' ') >= 0;
};

module.exports = {
  generateAccessToken,
  verifyToken,
  isAlphanumeric,
  hasWhitespace
};