const jwt = require('jsonwebtoken');

module.exports = department => {
  return function(req, res, next) {
    req.decodedToken &&
    req.decodedToken.department &&
    req.decodedToken.department.includes(department)
      ? next()
      : res.status(403).json({message: 'Access denied!'});
  };
};
