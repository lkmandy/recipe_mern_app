// Mongoose schema and model for a single item on a user's grocery list.
// Items are generated from saved recipes and grouped into store sections for easier shopping.
const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:    { type: String, required: true, trim: true },
    quantity:{ type: String, required: true, trim: true },
    recipe:  { type: String, required: true, trim: true }, // title of the source recipe
    section: {
      // Store aisle category used to group items in the UI
      type: String,
      enum: ['Produce', 'Protein', 'Dairy', 'Pantry', 'Other'],
      default: 'Other',
    },
    checked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GroceryItem', groceryItemSchema);
