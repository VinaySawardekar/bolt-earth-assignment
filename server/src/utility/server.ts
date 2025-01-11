import routers from "../routers/index";
import { apiPath, maxLimit } from "../config/constants";
import db from "../database/index";
import { environment } from "../config/environment";
import express = require("express");
import rateLimit from "express-rate-limit";
import * as path from "path";
import createDefaultUser from "./helper";
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const morgan = require("morgan");
const morganTiny = morgan("tiny");
const helmet = require("helmet");
const compression = require("compression");
let cilentBuildPath: string;
let clientIndexFile: string;
/**
 * Creates a express server for the Event Booking System.
 * - It has configuration for cors, limiter, helmet, compression, swagger, db, and routes path.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  let corsOptions = {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  };
  app.use(cors(corsOptions));
  app.use((req, res, next): any => {
    if (req.method == "OPTIONS") {
      return res.status(200).json({});
    }

    next();
  });

  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: maxLimit,
  });

  app.use(helmet());
  app.use(compression());

  /** Swagger only accesible for development and local environment */
  if (environment.env === "development" || environment.env === "local") {
    const swaggerFile = require("../../public/docs/swagger-output.json");
    app.use(
      "/docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerFile, {
        swaggerOptions: { persistAuthorization: true },
      }),
    );
  }

  /** Api Versioning */
  app.use(`${apiPath.PATH}${apiPath.VERSION}`, [morganTiny, limiter], routers);
  /** Database Initialization */
  db();
  /** Create Default User */
  createDefaultUser();
  /** Server Frontent Build */
  // if (environment.env === "production") {
  //   cilentBuildPath = path.join(__dirname, "../../../../client/dist/client");
  // } else {
  //   cilentBuildPath = path.join(__dirname, "../../../client/dist/client");
  // }
  // app.use(express.static(cilentBuildPath));

  // if (environment.env === "production") {
  //   clientIndexFile = path.join(
  //     __dirname,
  //     "../../../../client/dist/client/index.html"
  //   );
  // } else {
  //   clientIndexFile = path.join(
  //     __dirname,
  //     "../../../client/dist/client/index.html"
  //   );
  // }
  // app.use("*", (req, res) => {
  //   res.sendFile(clientIndexFile);
  // });
  return app;
};

export default createServer;
