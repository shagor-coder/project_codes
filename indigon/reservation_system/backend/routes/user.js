import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  createUser,
} from "../controller/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const _Router = express.Router();

// Create a new user
_Router.post("/", verifyAdmin, createUser);

// Get all the users
_Router.get("/all", verifyAdmin, getAllUser);

// Get the current user
_Router.get("/:id", verifyUser, getUser);

// Update the current user
_Router.put("/:id", verifyUser, updateUser);

// Delete the current user
_Router.delete("/:id", verifyUser, deleteUser);

export default _Router;
