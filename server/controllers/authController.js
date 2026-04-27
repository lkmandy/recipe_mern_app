// Handles user registration, login, and session retrieval.
// On success, each auth endpoint returns a JWT (JSON Web Token) the client stores and sends with future requests.
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    user.password = undefined; // remove hashed password

    res.status(201).json({ token: generateToken(user._id), user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    user.password = undefined; // remove hashed password

    res.json({ token: generateToken(user._id), user });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
const getMe = (req, res) => res.json(req.user);

module.exports = { register, login, getMe };
