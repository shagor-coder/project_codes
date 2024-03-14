import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
} from "../controller/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { registerUser } from "../controller/auth.js";

const _Router = express.Router();

// Create a new user
_Router.post("/", verifyAdmin, registerUser);

// Get the current user
_Router.get("/:id", verifyUser, getUser);

// Update the current user
_Router.put("/:id", verifyUser, updateUser);

// Delete the current user
_Router.delete("/:id", verifyUser, deleteUser);

// Get all the users
_Router.get("/", verifyAdmin, getAllUser);

export default _Router;
