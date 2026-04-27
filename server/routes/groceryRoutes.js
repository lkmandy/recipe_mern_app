// Grocery list routes. All endpoints require authentication — the list is scoped to the logged-in user.
const express = require('express');
const {
  generateList, getList, toggleItem, clearCompleted, resetList,
} = require('../controllers/groceryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',                protect, getList);
router.post('/generate',       protect, generateList);
router.put('/:id/toggle',      protect, toggleItem);
router.delete('/clear',        protect, clearCompleted);
router.put('/reset',           protect, resetList);

module.exports = router;