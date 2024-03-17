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
_Router.post("/:companyId/", verifyAdmin, createUser);

// Get all the users
_Router.get("/:companyId/all", verifyAdmin, getAllUser);

// Get the current user
_Router.get("/:companyId/:id/", verifyUser, getUser);

// Update the current user
_Router.put("/:companyId/:id/", verifyUser, updateUser);

// Delete the current user
_Router.delete("/:companyId/:id/", verifyUser, deleteUser);

export default _Router;
