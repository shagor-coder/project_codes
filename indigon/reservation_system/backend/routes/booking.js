import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import {
  createBooking,
  deleteBooking,
  getAllBookingForAdmin,
  getBooking,
  updateBooking,
} from "../controller/booking.js";

const _Router = express.Router();

// Create a Booking
_Router.post("/", verifyUser, createBooking);

// Get all the Bookings For A Admin
_Router.get("/:locationId/all", getAllBookingForAdmin);

// Get the current Booking
_Router.get("/:id", getBooking);

// Update the current Booking
_Router.put("/:id", verifyUser, updateBooking);

// Delete the current Booking
_Router.delete("/:id", verifyUser, deleteBooking);

export default _Router;
