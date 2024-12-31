const express = require("express");
const authController = require("../controllers/auth.controller");
const { registerValidator,loginValidator } = require("../middlewares/validation.middleware");

const router = express.Router();
router.post("/register", registerValidator, authController.registerUser);
router.post("/login", loginValidator, authController.loginUser);

module.exports = router;
