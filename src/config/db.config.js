const mongoose = require("mongoose");
const config = require("./env.config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    // process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
