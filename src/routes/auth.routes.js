const express = require("express");
const authController = require("../controllers/auth.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

module.exports = router;
