const express = require("express");
const categoriesController = require("../../controllers/common/category.controller");
const {
  categoryAddValidator,
  categoryDeleteValidator,
  categoryUpdateValidator,
} = require("../../utils/validators/category-validator");
const { verifyToken } = require("../../middlewares/auth.middleware");

const router = express.Router();

// Add Category Route
router.post(
  "/add-category",
  verifyToken,
  categoryAddValidator,
  categoriesController.addCategory // Ensure this function is properly imported
);

// Delete Category Route
router.delete(
  "/delete-category",
  verifyToken,
  categoryDeleteValidator,
  categoriesController.deleteCategory
);

// Update Category Route
router.put(
  "/update-category",
  verifyToken,
  categoryUpdateValidator,
  categoriesController.updateCategory
);

// Get Categories Route
router.get("/get-categories", verifyToken, categoriesController.getCategories);

module.exports = router;
