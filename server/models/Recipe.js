const mongoose = require('mongoose');

const CATEGORIES = [
  'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous',
  'Pasta', 'Pork', 'Seafood', 'Side', 'Starter',
  'Vegan', 'Vegetarian', 'Breakfast', 'Goat',
];

const ingredientSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true }, // e.g. "2 cups"
  },
  { _id: false } // Subdocuments don't need their own _id
);

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
    },
    ingredients: {
      type: [ingredientSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one ingredient is required',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: { values: CATEGORIES, message: '{VALUE} is not a valid category' },
    },
    area:       { type: String, trim: true, default: '' },  // e.g. "Italian"
    imageUrl:   { type: String, default: '' },
    prepTime:   { type: Number, min: 0, default: 0 },       // minutes
    cookTime:   { type: Number, min: 0, default: 0 },       // minutes
    servings:   { type: Number, min: 1, default: 2 },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Full-text search index on title, description, and tags
recipeSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);
