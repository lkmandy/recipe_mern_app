// Recipe routes. Read endpoints (GET) are public; write endpoints (POST, PUT, DELETE) require authentication.
// The recipeValidation array is shared between create and update to keep validation rules in one place.
const express = require('express');
const { body } = require('express-validator');
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

const recipeValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 500 }),
  body('instructions').trim().notEmpty().withMessage('Instructions are required'),
  body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required'),
  body('ingredients.*.name').trim().notEmpty().withMessage('Ingredient name is required'),
  body('ingredients.*.quantity').trim().notEmpty().withMessage('Ingredient quantity is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('prepTime').optional().isInt({ min: 0 }),
  body('cookTime').optional().isInt({ min: 0 }),
  body('servings').optional().isInt({ min: 1 }),
  body('difficulty').optional().isIn(['Easy', 'Medium', 'Hard']),
];

router.get('/',      getRecipes);
router.get('/:id',   getRecipeById);
router.post('/',     protect, recipeValidation, validate, createRecipe);
router.put('/:id',   protect, recipeValidation, validate, updateRecipe);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
