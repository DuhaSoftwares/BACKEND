const { check } = require('express-validator')


exports.permissionAddValidator = [
  check("permission_name", "permission_name is required").not().isEmpty(),
];