import express from "express";
import { verifyUser } from "../utils/verifyToken";
import { upload } from "../utils/validateFileType";
import {
  createRestaurant,
  deleteFeaturedImage,
  deleteRestaurant,
  deleteRestaurantImage,
  getAllRestaurant,
  getRestaurantForAdmin,
  getRestaurantForWeb,
  updateRestaurant,
} from "../controller/Restaurant";

const _Router = express.Router();

// Create a Restaurant
_Router.post(
  "/:locationId",
  verifyUser,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  createRestaurant
);

// Get all the Restaurants
_Router.get("/:locationId/all", verifyUser, getAllRestaurant);

// Get the current Restaurant for admin
_Router.get("/:id", verifyUser, getRestaurantForAdmin);

// Get the current Restaurant for web
_Router.get("/site/:id", getRestaurantForWeb);

// Update the current Restaurant
_Router.put(
  "/:id/update",
  verifyUser,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  updateRestaurant
);

// Delete the current Restaurant
_Router.delete("/:id", verifyUser, deleteRestaurant);

// Delete the current Restaurant
_Router.delete("/:id/deleteImage/", verifyUser, deleteRestaurantImage);

// Delete the current Restaurant
_Router.delete("/:id/deleteFeaturedImage/", verifyUser, deleteFeaturedImage);

export default _Router;
