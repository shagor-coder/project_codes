import { BookingModel } from "../models/Booking.js";
import { createError } from "../utils/error.js";

// Get all bookings for a table
export const getAllBookingForAdmin = async (req, res, next) => {
  try {
    const allBookings = await BookingModel.find({
      locationId: req.params.locationId,
    });
    if (!allBookings) return next(createError(404, "Bookings not found"));
    res.status(200).json({ status: "success", data: allBookings });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get all booking for a client
export const getAllBookingForClient = async (req, res, next) => {
  try {
    const allBookings = await BookingModel.find({
      clientId: req.params.id,
    });
    if (!allBookings) return next(createError(404, "Bookings not found"));
    res.status(200).json({ status: "success", data: allBookings });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get a single booking
export const getBooking = async (req, res, next) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) return next(createError(404, "Booking not found"));
    res.status(200).json({ status: "success", data: booking });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Create a booking
export const createBooking = async (req, res, next) => {
  try {
    const newBooking = new BookingModel(req.body);
    const savedBooking = await newBooking.save();
    res.status(200).json({
      status: "success",
      message: "Booking have been created!",
      data: savedBooking,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update a booking
export const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await BookingModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedBooking) return next(createError(404, "Booking not available"));

    res.status(200).json({
      status: "success",
      message: "Booking have been updated!",
      data: updatedBooking,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Delete a booking
export const deleteBooking = async (req, res, next) => {
  try {
    const findBooking = await BookingModel.findById(req.params.id);
    if (!findBooking) return next(createError(404, "Booking not available"));
    await findBooking.deleteOne();
    res.status(200).json({
      status: "success",
      message: "Booking deleted successfully",
      data: { id: req.params.id },
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};
