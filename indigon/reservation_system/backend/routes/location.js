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
_Router.post("/", verifyAdmin, createLocation);

// Get the current location
_Router.get("/:id", verifyUser, getLocation);

// Update the current location
_Router.put("/:id", verifyUser, updateLocation);

// Delete the current location
_Router.delete("/:id", verifyAdmin, deleteLocation);

// Get all the locations
_Router.get("/", verifyAdmin, getAllLocation);

export default _Router;
