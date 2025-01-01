const express = require("express");
const authController = require("../controllers/auth.controller");
const { registerValidator,loginValidator } = require("../middlewares/validation.middleware");
const { verifyToken } = require("../middlewares/auth.middleware");
const router = express.Router();
router.post("/register", registerValidator, authController.registerUser);
router.post("/login", loginValidator, authController.loginUser);
router.get("/profile", verifyToken, authController.getProfile);


module.exports = router;
