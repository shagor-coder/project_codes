import express from "express";
import { loginUser, registerUser } from "../controller/auth.js";

const _Router = express.Router();

// Create user
_Router.post("/register", registerUser);
// Get a user
_Router.post("/login", loginUser);

export default _Router;
