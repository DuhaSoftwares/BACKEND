const app = require("./app");
const connectDB = require("./config/db.config"); // Import the database connection function
const config = require("./config/env.config");

const port = config.PORT || 3000;

// Call the database connection function
connectDB()
  .then(() => {
    // Start the server only after a successful database connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
    // process.exit(1); // Exit process with failure
  });
