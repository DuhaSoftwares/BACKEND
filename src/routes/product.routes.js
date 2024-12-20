const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getAllProducts); // Adjusted route

router.post("/", productController.createProduct); // Adjusted route

module.exports = router;
