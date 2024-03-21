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
    if (req.user) res.code(200), json({ id: user.id });
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

export default _Router;
