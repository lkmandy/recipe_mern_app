// Middleware that collects errors reported by express-validator rule chains and returns a 400 response if any fail.
// Place it after the validation rules array and before the controller in each route definition.
const { validationResult } = require('express-validator');

// Runs after express-validator chains; returns 400 if any fail
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
