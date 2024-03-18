import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurant,
  getRestaurant,
  updateRestaurant,
} from "../controller/restaurant.js";
import { verifyUser } from "../utils/verifyToken.js";

const _Router = express.Router();

// Create a Restaurant
_Router.post("/:locationId", verifyUser, createRestaurant);

// Get all the Restaurants
_Router.get("/:locationId/all", getAllRestaurant);

// Get the current Restaurant
_Router.get("/:locationId/:id", getRestaurant);

// Update the current Restaurant
_Router.put("/:locationId/:id", verifyUser, updateRestaurant);

// Delete the current Restaurant
_Router.delete("/:locationId/:id", verifyUser, deleteRestaurant);

export default _Router;
