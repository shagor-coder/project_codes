import express from "express";
import { loginUser, registerUser } from "../controller/auth.js";
import { verifyUser } from "../utils/verifyToken.js";

const _Router = express.Router();

// Create user
_Router.post("/register", registerUser);
// Log in user
_Router.post("/login", loginUser);
// Validate token
_Router.get("/validate/token", verifyUser, (req, res) => {
  try {
    if (req.user) res.status(200).json({ id: req.user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default _Router;
