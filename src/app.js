const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error.middleware");
// Routes
const productRoutes = require("./routes/product.routes");
const authRoute = require("./routes/auth.routes");
const adminRoute = require("./routes/admin.routes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all origins (or restrict to specific origins)
app.use(
  cors({
    origin: "*", // Replace '*' with specific domain(s) for more security
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/auth/", authRoute);
app.use("/api/admin/", adminRoute);

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;
