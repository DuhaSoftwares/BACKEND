const express = require("express");
const permissionController = require("../controllers/admin/permission.controller");
const {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
} = require("../utils/validators/permission-validator.middleware");
const { onlyAdminAccess } = require("../middlewares/admin.middleware");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post(
  "/add-permission",
  verifyToken,
  onlyAdminAccess,
  permissionAddValidator,
  permissionController.addPermission
);
router.delete(
  "/delete-permission",
  verifyToken,
  onlyAdminAccess,
  permissionDeleteValidator,
  permissionController.deletePermission
);
router.put(
  "/update-permission",
  verifyToken,
  onlyAdminAccess,
  permissionUpdateValidator,
  permissionController.updatePermission
);
router.get(
  "/get-permissions",
  verifyToken,
  onlyAdminAccess,
  permissionController.getPermissions
);
module.exports = router;
