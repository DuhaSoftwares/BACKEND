const { check } = require('express-validator')


exports.categoryAddValidator = [
  check("category_name", "category_name is required").not().isEmpty(),
];
exports.categoryDeleteValidator = [
  check("id", "ID is required").not().isEmpty(),
];
exports.categoryUpdateValidator = [
  check("id", "ID is required").not().isEmpty(),
  check("category_name", "category_name is required").not().isEmpty(),
];