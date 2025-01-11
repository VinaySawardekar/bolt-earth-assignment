import { getUserRole, getUser } from "./controller";
const express = require("express");
const userRouters = express.Router();

userRouters.get("/", getUser);
userRouters.get("/role", getUserRole);

export default userRouters;
