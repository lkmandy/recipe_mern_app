// Favorites routes. All endpoints require authentication — a user can only manage their own saved recipes.
const express = require('express');
const { getFavorites, toggleFavorite, getFavoriteStatus } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',                      protect, getFavorites);
router.post('/:recipeId',            protect, toggleFavorite);
router.get('/:recipeId/status',      protect, getFavoriteStatus);

module.exports = router;
