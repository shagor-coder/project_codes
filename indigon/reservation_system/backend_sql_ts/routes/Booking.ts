import express from "express";
import { verifyUser } from "../utils/verifyToken";
import {
  createBooking,
  deleteBooking,
  getAllBookingForAdmin,
  getAllBookingForClient,
  getBooking,
  updateBooking,
} from "../controller/Booking";

const _Router = express.Router();

// Create a Booking
_Router.post("/", verifyUser, createBooking);

// Get all the Bookings For A Admin
_Router.get("/:locationId/all", verifyUser, getAllBookingForAdmin);

// Get the current Booking
_Router.get("/:id", getBooking);

// Update the current Booking
_Router.put("/:id", verifyUser, updateBooking);

// Delete the current Booking
_Router.delete("/:id", verifyUser, deleteBooking);

export default _Router;
