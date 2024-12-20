// src/middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
const config = require("../config/env.config");

// Verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Role-based access control (RBAC)
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
