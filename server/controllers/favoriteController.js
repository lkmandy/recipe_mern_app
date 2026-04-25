const Favorite = require('../models/Favorite');
const Recipe   = require('../models/Recipe');

// ------GET /api/favorites ------
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).populate({
      path: 'recipe',
      populate: { path: 'author', select: 'username avatarUrl' },
    });
    res.json(favorites.map((f) => f.recipe).filter(Boolean));
  } catch (err) {
    next(err);
  }
};

// ------POST /api/favorites/:recipeId  — toggles save/unsave ------
const toggleFavorite = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    const existing = await Favorite.findOne({ user: req.user._id, recipe: recipe._id });
    if (existing) {
      await existing.deleteOne();
      return res.json({ saved: false });
    }
    await Favorite.create({ user: req.user._id, recipe: recipe._id });
    res.status(201).json({ saved: true });
  } catch (err) {
    next(err);
  }
};

// ------GET /api/favorites/:recipeId/status ------
const getFavoriteStatus = async (req, res, next) => {
  try {
    const exists = await Favorite.exists({ user: req.user._id, recipe: req.params.recipeId });
    res.json({ saved: !!exists });
  } catch (err) {
    next(err);
  }
};

module.exports = { getFavorites, toggleFavorite, getFavoriteStatus };
