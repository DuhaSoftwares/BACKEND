const express = require("express");
const permissionController = require("../controllers/admin/permission.controller");
const {permissionAddValidator } = require("../middlewares/admin-validator.middleware");

const router = express.Router();
router.post(
  "/add-permission",
  permissionAddValidator,
  permissionController.addPermission
);

module.exports = router;
