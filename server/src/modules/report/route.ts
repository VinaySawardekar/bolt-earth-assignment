import { getReports } from "./controller";
const express = require("express");
const eventRoutes = express.Router();

eventRoutes.get("/tickets-sold", getReports);

export default eventRoutes;
