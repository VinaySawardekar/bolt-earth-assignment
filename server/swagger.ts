const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const appName = "Booking Event System Swagger Documentation";
const appDesc = "API Endpoints for Booking Event System";

const doc = {
  info: {
    title: appName,
    description: appDesc,
  },
  host: "localhost:8081/api/v1",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      in: "header",
      bearerFormat: "JWT",
      name: "Authorization",
      description: `Enter your bearer JWT token.`,
    },
  },
  definitions: {},
};

let outputFile = "./public/docs/swagger-output.json";
if (!fs.existsSync(outputFile)) {
  outputFile = fs.openSync(outputFile, "w");
}
const endpointsFiles = ["./src/routers/index.ts"];
swaggerAutogen(outputFile, endpointsFiles, doc);
