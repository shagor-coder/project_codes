import express from "express";
import {
  bookTable,
  cancelBooking,
  createTable,
  deleteTable,
  getAllTable,
  getTable,
  updateTable,
} from "../controller/table.js";
import { verifyUser } from "../utils/verifyToken.js";

const _Router = express.Router();

// Create a Table
_Router.post("/:restaurantId", verifyUser, createTable);

// Get all the Tables
_Router.get("/:restaurantId/all", getAllTable);

// Get the current Table
_Router.get("/:id", getTable);

// Update the current Table
_Router.put("/:restaurantId/:id", verifyUser, updateTable);

// Book a Table
_Router.post("/:id/book", bookTable);

// Book a Table
_Router.post("/:id/cancel", cancelBooking);

// Delete the current Table
_Router.delete("/:restaurantId/:id", verifyUser, deleteTable);

export default _Router;
