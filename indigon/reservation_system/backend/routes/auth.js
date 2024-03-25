import express from "express";

import { verifyUser } from "../utils/verifyToken.js";
import {
  loginUser,
  logout,
  registerUser,
} from "../controller/authentication.js";

const _Router = express.Router();

// Create user
_Router.post("/register", registerUser);
// Log in user
_Router.post("/login", loginUser);
// Validate token
_Router.post("/logout", verifyUser, logout);

_Router.post("/callback", (req, res, next) => {});

export default _Router;
