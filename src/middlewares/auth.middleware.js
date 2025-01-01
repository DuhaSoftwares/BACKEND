const jwt = require("jsonwebtoken");
const config = require("../config/env.config");

const verifyToken = (req, res, next) => {
  const token =
    req.headers["authorization"] || req.body.token || req.query.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "No token provided",
    });
  }

  try {
    // Expect "Bearer <token>"
    const BearerToken = token.split(" ")[1];
    if (!BearerToken) {
      throw new Error("Token format invalid");
    }

    const decodedData = jwt.verify(BearerToken, config.JWT_SECRET);
    if (!decodedData.user) {
      throw new Error("Invalid token payload");
    }

    req.user = decodedData.user; // Attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: error.message || "Invalid token",
    });
  }
};

module.exports = { verifyToken };
