import express from "express";
import { verifyUser } from "../utils/verifyToken";
import {
  createLocation,
  deleteLocation,
  getAllLocation,
  getLocation,
  updateLocation,
} from "../controller/Location";

const _Router = express.Router();

// Create a location
_Router.post("/", verifyUser, createLocation);

// Get all the locations
_Router.get("/all", verifyUser, getAllLocation);

// Get the current location
_Router.get("/:id", verifyUser, getLocation);

// Update the current location
_Router.put("/:id", verifyUser, updateLocation);

// Delete the current location
_Router.delete("/:id", verifyUser, deleteLocation);

export default _Router;
