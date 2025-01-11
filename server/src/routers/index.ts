const express = require("express");
const router = express.Router();
import { healthCheck, init } from "../controllers/healthCheckController";
import eventRoutes from "../modules/event/route";
import reportRoutes from "../modules/report/route";
import userRoutes from "../modules/user/route";

router.get("/", init);
router.get("/health-check", healthCheck);
router.use("/user", userRoutes);
router.use("/events", eventRoutes);
router.use("/report", reportRoutes);

export default router;
