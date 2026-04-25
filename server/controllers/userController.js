const User   = require('../models/User');
const Recipe = require('../models/Recipe');

// ------GET /api/users/:id------
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const recipes = await Recipe.find({ author: user._id }).sort({ createdAt: -1 });
    res.json({ user, recipes });
  } catch (err) {
    next(err);
  }
};

// ------PUT /api/users/me------
const updateProfile = async (req, res, next) => {
  try {
    const { username, bio, avatarUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, bio, avatarUrl },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserProfile, updateProfile };
