const { check } = require('express-validator')


exports.postAddValidator = [
    check("title", "title is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
];
exports.postDeleteValidator = [
  check("id", "ID is required").not().isEmpty(),
];
exports.postUpdateValidator = [
    check("id", "ID is required").not().isEmpty(),
    check("title", "title is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
];