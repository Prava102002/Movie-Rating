// authMiddleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, token not found' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'jwtSecret');

    // Set user in req object
    req.user = decoded.user;

    // Move to next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
