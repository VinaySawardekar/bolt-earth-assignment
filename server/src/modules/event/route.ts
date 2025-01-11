import {
  getAllEvents,
  createEvent,
  getEventsById,
  purchaseTickets,
} from "./controller";
const express = require("express");
const eventRoutes = express.Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/", getAllEvents);
eventRoutes.get("/:id", getEventsById);
eventRoutes.post("/:id/purchase", purchaseTickets);

export default eventRoutes;
