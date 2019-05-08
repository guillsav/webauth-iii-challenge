const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({message: 'Invalid credentials!'});
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};
