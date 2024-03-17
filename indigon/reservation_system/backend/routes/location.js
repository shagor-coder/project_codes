import express from "express";
import {
  createLocation,
  deleteLocation,
  getAllLocation,
  getLocation,
  updateLocation,
} from "../controller/location.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const _Router = express.Router();

// Create a location
_Router.post("/:id", verifyAdmin, createLocation);

// Get the current location
_Router.get("/:id", verifyUser, getLocation);

// Update the current location
_Router.put("/:id", verifyUser, updateLocation);

// Delete the current location
_Router.delete("/:id", verifyUser, deleteLocation);

// Get all the locations
_Router.get("/:id", verifyAdmin, getAllLocation);

export default _Router;
