import express from "express";
import { userDashboardHandler, userProfileHandler } from "./user.controller";
import { auth } from "../middleware/auth";

const userRoute = express.Router();

userRoute.get("/profile",auth, userProfileHandler);
userRoute.get("/dashboard",auth, userDashboardHandler);


export default userRoute;
