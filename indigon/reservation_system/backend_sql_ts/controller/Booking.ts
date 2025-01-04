import { format } from "date-fns";
import { Request, Response, NextFunction } from "express";
import { BookingModel, RestaurantModel } from "../models";
import { createError } from "../utils/error";
import { Op } from "sequelize";

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
      attributes: {
        exclude: ["restaurantId", "locationId"],
      },
    });

    if (!allBookings.length)
      return next(createError(404, "Bookings not found"));

    response.status(200).json({ status: "success", data: allBookings });
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

export const createBooking = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body = request.body as RequestBody;
    const { startTime } = body;
    const bookedDateTime = new Date(startTime);

    // Validate date is valid
    if (isNaN(bookedDateTime.getTime())) {
      return response.status(400).json({ message: "Invalid date format" });
    }

    // Check for past bookings
    if (new Date() >= bookedDateTime) {
      return response
        .status(403)
        .json({ message: "You cannot book a time in the past!" });
    }

    // Validate working hours (5 AM to 5 PM)
    const bookedHour = bookedDateTime.getHours();
    const WORKING_HOURS = {
      START: 8,
      END: 17,
    };

    if (bookedHour < WORKING_HOURS.START || bookedHour >= WORKING_HOURS.END) {
      return response.status(400).json({
        message: "You can only book within working hours (5 AM to 5 PM)!",
      });
    }

    // Check for existing bookings
    const startOfHour = new Date(bookedDateTime);
    startOfHour.setMinutes(0, 0, 0);

    const endOfHour = new Date(bookedDateTime);
    endOfHour.setMinutes(59, 59, 999);

    const existingBooking = await BookingModel.findOne({
      where: {
        startTime: {
          [Op.between]: [startOfHour, endOfHour],
        },
      },
    });

    if (existingBooking) {
      return response.status(403).json({
        message: "This time slot is already booked",
      });
    }

    const restaurant = await RestaurantModel.findByPk(body.restaurantId);

    if (!restaurant)
      return response.status(404).json({ message: "No restaurant found!!" });

    const booking = await BookingModel.create({
      ...body,
      restaurantName: restaurant.toJSON().name,
    });

    response.status(201).json({
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Booking creation failed:", error);

    if (error instanceof Error) {
      return response.status(500).json({
        message: "Failed to create booking",
        error: error.message,
      });
    }

    return response.status(500).json({
      message: "An unexpected error occurred",
    });
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
