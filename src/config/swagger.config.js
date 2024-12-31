const swaggerAutogen = require("swagger-autogen")(); // Properly define swaggerAutogen

const options = {
  openapi: "OpenAPI 3",
  language: "en-US",
  disableLogs: false,
  autoHeaders: false,
  autoQuery: false,
  autoBody: false,
};

const swaggerDocument = {
  info: {
    version: "1.0.0",
    title: "SIMS",
    description: "API for Managing Sims",
    contact: {
      name: "API Support",
      email: "duhasoftwares@outlook.com",
    },
  },
  host:
    process.env.NODE_ENV === "production"
      ? "api.duhasoftwares.com"
      : "localhost:3000",
  basePath: "/",
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "auth",
      description: "Auth related APIs",
    },
    {
      name: "product",
      description: "Product APIs",
    },
    {
      name: "Authentication",
      description: "Authentication related APIs",
    },
  ],
  securityDefinitions: {},
  definitions: {
    todoResponse: {
      code: 200,
      message: "Success",
    },
    "errorResponse.400": {
      code: 400,
      message:
        "The request was malformed or invalid. Please check the request parameters.",
    },
    "errorResponse.401": {
      code: 401,
      message: "Authentication failed or user lacks proper authorization.",
    },
    "errorResponse.403": {
      code: 403,
      message: "You do not have permission to access this resource.",
    },
    "errorResponse.404": {
      code: 404,
      message: "The requested resource could not be found on the server.",
    },
    "errorResponse.500": {
      code: 500,
      message:
        "An unexpected error occurred on the server. Please try again later.",
    },
  },
};

const outputFile = "./config/swagger-output.json";
const endpointsFiles = [
  "./app.js",
  "./routes/auth.routes.js",
  "./routes/product.routes.js",
  "./routes/authentication.route.js",
];

// Generate Swagger documentation
if (process.env.NODE_ENV === "development") {
  console.log("Generating Swagger documentation...");
  swaggerAutogen(outputFile, endpointsFiles, swaggerDocument, options)
    .then(() => {
      console.log("Swagger documentation generated successfully.");
    })
    .catch((err) => {
      console.error("Failed to generate Swagger documentation:", err);
    });
} else {
  console.log("Skipping Swagger generation for production.");
}
