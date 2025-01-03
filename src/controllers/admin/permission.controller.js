const { validationResult } = require("express-validator");
const Permission = require("../../models/Permissions-model");
const { set } = require("mongoose");

// Add Permission
// Commit: Added a new permission after validating input and checking for duplicates.
const addPermission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array(),
      });
    }

    const { permission_name } = req.body;

    // Check if the permission already exists for the current user
    const isExistingPermission = await Permission.findOne({
      permission_name,
      userId: req.user._id, // Check against current user's permissions
    });

    if (isExistingPermission) {
      return res.status(400).json({
        success: false,
        msg: "Permission already exists for this user!",
      });
    }

    // Create the new permission object
    const obj = {
      permission_name,
      userId: req.user._id, // Link current user
    };

    if (req.body.default) {
      obj.is_default = parseInt(req.body.default);
    }

    // Save the new permission to the database
    const permission = new Permission(obj);
    const permissionData = await permission.save();

    return res.status(201).json({
      success: true,
      msg: "Permission added successfully!",
      data: permissionData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};

// Get Permissions
// Commit: Fetched all permissions associated with the logged-in user.
const getPermissions = async (req, res) => {
  try {
    // Retrieve permissions of the current user
    const permissions = await Permission.find({ userId: req.user._id });
    return res.status(200).json({
      success: true,
      data: permissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};

// Update Permission
// Commit: Updated a permission after validating input and ensuring ownership.
const updatePermission = async (req, res) => {
  try {
    const { id, permission_name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array(),
      });
    }

    // Check if the user owns the permission they are trying to update
    const currentPermission = await Permission.findOne({
      _id: id,
      userId: req.user._id, // Check ownership
    });

    if (!currentPermission) {
      return res.status(404).json({
        success: false,
        msg: "Permission not found for this user",
      });
    }
    // Check if the new permission name already exists for this user
    // Check if the new name is already assigned to another record
    const isNameAssigned = await Permission.findOne({
      _id: { $ne: id },
      permission_name,
    });

    if (isNameAssigned) {
      return res.status(400).json({
        success: false,
        msg: "Permission name already assigned to another permission",
      });
    }

    // Check if the name is unchanged
    if (currentPermission.permission_name === permission_name) {
      return res.status(409).json({
        success: false,
        msg: "Permission name is unchanged",
        data: currentPermission,
      });
    }
    // Prepare updated data
    const updateData = { permission_name };
    if (req.body.default !== undefined) {
      updateData.is_default = parseInt(req.body.default, 10);
    }

    // Update the permission
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Permission updated successfully",
      data: updatedPermission,
    });
  } catch (error) {
    console.error("Error updating permission:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

// Delete Permission
// Commit: Deleted a permission after confirming user ownership.
const deletePermission = async (req, res) => {
  try {
    const { id } = req.body;

    // Find and delete the permission if owned by the user
    const permission = await Permission.findOneAndDelete({
      _id: id,
      userId: req.user._id, // Ensure user owns the permission
    });

    if (!permission) {
      return res.status(404).json({
        success: false,
        msg: "Permission not found or not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Permission deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};

module.exports = {
  addPermission,
  getPermissions,
  updatePermission,
  deletePermission,
};
