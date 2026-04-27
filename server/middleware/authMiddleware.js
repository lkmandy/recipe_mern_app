// Authentication middleware. Reads the JWT (JSON Web Token) from the Authorization header,
// verifies it, and attaches the matching user document to req.user for use in downstream route handlers.
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Requires a valid JWT   rejects if missing or invalid
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorised   no token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'User no longer exists' });
    next();
  } catch {
    res.status(401).json({ message: 'Not authorised   token invalid or expired' });
  }
};

module.exports = { protect };
