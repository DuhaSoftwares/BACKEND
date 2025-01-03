

const onlyAdminAccess = (req, res, next) => { 
  try {
    
    if (req.user.role !== 1) { // 0 is the admin role
      return res.status(403).json({
        success: false,
        msg: "Access denied",
      });
    }
   return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
    });
    
  }
}

module.exports = { onlyAdminAccess };