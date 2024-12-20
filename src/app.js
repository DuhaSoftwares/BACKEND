const express = require("express");
const connectDB = require("./config/db.config");
const cors = require("cors");
const swaggerConfig = require("./config/swagger.config");
const authMiddleware = require("./middlewares/auth.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const validationMiddleware = require("./middlewares/validation.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger-output.json");

// Routes
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");

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
app.use("", authRoutes);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;
