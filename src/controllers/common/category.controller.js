const { validationResult } = require("express-validator");
const CategoryModel = require("../../models/category-model"); // Renamed the model variable

// Add category
const addCategory = async (req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array() ,
      });
    }

    const { category_name } = req.body;

    // Check if the category already exists for the current user
    const isExistingCategory = await CategoryModel.findOne({
      category_name,
      userId: req.user._id, // Check against current user's category
    });

    if (isExistingCategory) {
      return res.status(400).json({
        success: false,
        msg: "Category already exists for this user!",
      });
    }

    // Create the new category object
    const obj = {
      category_name,
      userId: req.user._id, // Link current user
    };

    if (req.body.default) {
      obj.is_default = parseInt(req.body.default);
    }

    // Save the new category to the database
    const newCategory = new CategoryModel(obj); // Renamed variable
    const categoryData = await newCategory.save();

    return res.status(201).json({
      success: true,
      msg: "Category added successfully!",
      data: categoryData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};

// Get categories
const getCategories = async (req, res) => {
  try {
    // Retrieve categories of the current user
    const categories = await CategoryModel.find({ userId: req.user._id });
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id, category_name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array(),
      });
    }

    // Check if the user owns the category they are trying to update
    const currentCategory = await CategoryModel.findOne({
      _id: id,
      userId: req.user._id, // Check ownership
    });

    if (!currentCategory) {
      return res.status(404).json({
        success: false,
        msg: "Category not found for this user",
      });
    }

    // Check if the new category name already exists for this user
    const isNameAssigned = await CategoryModel.findOne({
      _id: { $ne: id },
      category_name,
    });

    if (isNameAssigned) {
      return res.status(400).json({
        success: false,
        msg: "Category name already assigned to another category",
      });
    }

    // Check if the name is unchanged
    if (currentCategory.category_name === category_name) {
      return res.status(409).json({
        success: false,
        msg: "Category name is unchanged",
        data: currentCategory,
      });
    }

    // Update the category
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { $set: { category_name } },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    // Find and delete the category if owned by the user
    const categoryToDelete = await CategoryModel.findOneAndDelete({
      _id: id,
      userId: req.user._id, // Ensure user owns the category
    });

    if (!categoryToDelete) {
      return res.status(404).json({
        success: false,
        msg: "Category not found or not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Category deleted successfully",
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
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
