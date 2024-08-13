import express from "express";
import {
	signupHandler,
	signinHandler,
} from "./auth.controller";

const authRoute = express.Router();

authRoute.post("/signup", signupHandler);
authRoute.post("/signin", signinHandler);


export default authRoute;
