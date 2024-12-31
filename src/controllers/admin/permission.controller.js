const { validationResult } = require("express-validator");
const Permission=require('../../models/Permissions-model')

const addPermission = async (req, res) => {
  try {
    // Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array(),
      });
      }
      
      const { permission_name } = req.body;

      const isExistingPermission = await Permission.findOne({ permission_name });
        if (isExistingPermission) {
            return res.status(400).json({
            success: false,
            msg: "Permission already exists!",
            });
      }
      var obj={
        permission_name
      }
      if(req.body.default){
        obj.is_default=parseInt(req.body.default)
      }

      const permission = new Permission(obj);
      const permissionData = await permission.save();
        return res.status(201).json({
            success: true,
            msg: "Permission added successfully!",
            data: permissionData,
        });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};

module.exports = {addPermission}