require("dotenv").config(); // Load environment variables

module.exports = {
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 3000,
};
