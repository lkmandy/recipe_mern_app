const Recipe   = require('../models/Recipe');
const Favorite = require('../models/Favorite');

// GET /api/recipes?search=&category=&area=&difficulty=&sort=&page=&limit=
const getRecipes = async (req, res, next) => {
  try {
    const { search, category, area, difficulty, sort = 'newest', page = 1, limit = 12 } = req.query;

    const filter = {};
    if (search)     filter.$text = { $search: search };
    if (category)   filter.category   = category;
    if (area)       filter.area        = area;
    if (difficulty) filter.difficulty  = difficulty;

    const sortOptions = { newest: { createdAt: -1 }, oldest: { createdAt: 1 }, az: { title: 1 } };
    const skip = (Number(page) - 1) * Number(limit);

    const [recipes, total] = await Promise.all([
      Recipe.find(filter)
        .sort(sortOptions[sort] ?? sortOptions.newest)
        .skip(skip)
        .limit(Number(limit))
        .populate('author', 'username avatarUrl'),
      Recipe.countDocuments(filter),
    ]);

    res.json({ recipes, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};

// GET /api/recipes/:id
const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username avatarUrl bio');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

// POST /api/recipes
const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create({ ...req.body, author: req.user._id });
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

// PUT /api/recipes/:id
const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to edit this recipe' });
    }
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/recipes/:id
const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorised to delete this recipe' });
    }
    await Promise.all([
      recipe.deleteOne(),
      Favorite.deleteMany({ recipe: recipe._id }), // Clean up orphaned favorites
    ]);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe };
