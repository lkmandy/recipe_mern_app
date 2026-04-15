const express = require('express');
const { body } = require('express-validator');
const { getUserProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/:id', getUserProfile);

router.put(
  '/me',
  protect,
  [
    body('username').optional().trim().isLength({ min: 3, max: 30 }),
    body('bio').optional().isLength({ max: 200 }),
    body('avatarUrl').optional().isURL().withMessage('Avatar must be a valid URL'),
  ],
  validate,
  updateProfile
);

module.exports = router;
