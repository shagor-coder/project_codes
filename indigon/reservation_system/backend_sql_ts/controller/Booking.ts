import { format } from "date-fns";
import { Request, Response, NextFunction } from "express";
import { BookingModel } from "../models";
import { createError } from "../utils/error";

type RequestBody = {
  id?: string;
  tableName: string;
  startTime: Date;
  endTime: Date;
  clientName: string;
  clientId: string;
  locationId: string;
  tableId: string;
  bookingStatus: string;
  restaurantId: string;
  numberOfGuest: string;
};

// Get all bookings for a table
export const getAllBookingForAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const allBookings = await BookingModel.findAll({
      where: {
        locationId: request.params.locationId as string,
      },
    });

    if (!allBookings.length)
      return next(createError(404, "Bookings not found"));

    response.status(200).json({ status: "success", data: "" });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get all booking for a client
export const getAllBookingForClient = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const allBookings = await BookingModel.findAll({
      where: { clientId: request.params.clientId as string },
    });
    if (!allBookings.length)
      return next(createError(404, "Bookings not found"));
    response.status(200).json({ status: "success", data: allBookings });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get a single booking
export const getBooking = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const booking = await BookingModel.findByPk(request.params.id as string, {
      attributes: { exclude: ["restaurantId", "locationId"] },
    });
    if (!booking) return next(createError(404, "Booking not found"));
    response.status(200).json({ status: "success", data: booking });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Create a booking
export const createBooking = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const newBooking = await BookingModel.create(request.body as RequestBody);
    response.status(200).json({
      status: "success",
      message: "Booking have been created!",
      data: newBooking,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Update a booking
export const updateBooking = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { bookingStatus, startTime, endTime } = request.body as RequestBody;

  try {
    const updatedBooking = await BookingModel.update(
      { id: request.params.id as string },
      {
        fields: {
          //@ts-ignore
          bookingStatus: bookingStatus as string,
          endTime: endTime,
          startTime: startTime,
        },
      }
    );

    response.status(200).json({
      status: "success",
      message: "Booking have been updated!",
      data: updatedBooking,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Delete a booking
export const deleteBooking = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await BookingModel.destroy({
      where: { id: request.params.id as string },
    });
    response.status(200).json({
      status: "success",
      message: "Booking deleted successfully",
      data: { id: request.params.id },
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};
