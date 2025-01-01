const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/env.config");
const User = require("../models/user-model");

const registerUser = async (req, res) => {
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

    const { name, email, password } = req.body;

    // Check if the user already exists
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({
        success: false,
        msg: "Email already exists!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const userData = await user.save();

    return res.status(201).json({
      success: true,
      msg: "User registered successfully!",
      data: userData,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(200).json({
        success: false,
        msg: "User not found",
      });
    }

    bcrypt.compare(password, userData.password, (err, result) => {
      if (err) {
        return res.status(200).json({
          success: false,
          msg: "Invalid credentials",
        });
      }
      if (result) {
        // Remove the password field before returning user data
        const userWithoutPassword = userData.toObject();
        delete userWithoutPassword.password;

        const token = jwt.sign(
         { user: userWithoutPassword},
          config.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          success: true,
          msg: "Login successful",
          data: userWithoutPassword, // Return user data without password
          token,
          tokenType: "Bearer",
        });
      }
      return res.status(200).json({
        success: false,
        msg: "Invalid credentials",
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.msg,
    });
  }
};


const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        msg: "User data not found in token",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Profile fetched successfully",
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
