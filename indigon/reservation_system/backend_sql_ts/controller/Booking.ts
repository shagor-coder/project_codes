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
    const { startTime, endTime } = body;
    const bookedStartDateTime = new Date(startTime);
    const bookedEndDateTime = new Date(endTime);

    if (
      isNaN(bookedStartDateTime.getTime()) ||
      isNaN(bookedEndDateTime.getTime())
    ) {
      return next(createError(403, "Invalid date format"));
    }

    if (new Date() >= bookedStartDateTime) {
      return next(createError(403, "Cannot book a time in past!"));
    }

    const bookedHour = bookedStartDateTime.getUTCHours();
    const WORKING_HOURS = {
      START: 8,
      END: 17,
    };

    if (bookedHour < WORKING_HOURS.START || bookedHour >= WORKING_HOURS.END) {
      return next(
        createError(
          403,
          "You can only book within working hours (5 AM to 5 PM)!"
        )
      );
    }

    const startOfHour = new Date(bookedStartDateTime);
    startOfHour.setMinutes(0, 0, 0);

    const endOfHour = new Date(bookedEndDateTime);
    endOfHour.setMinutes(0, 0, 0);

    const differenceInMilliseconds =
      bookedEndDateTime.getTime() - bookedStartDateTime.getTime();

    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    if (differenceInHours > 1)
      return next(createError(403, "Time must be same day and hour"));

    const existingBooking = await BookingModel.findOne({
      where: {
        startTime: {
          [Op.between]: [startOfHour, endOfHour],
        },
      },
    });

    if (existingBooking) {
      return next(createError(403, "This time slot is already booked"));
    }

    const restaurant = await RestaurantModel.findByPk(body.restaurantId);

    if (!restaurant) return next(createError(404, "No restaurant found"));

    const booking = await BookingModel.create({
      ...body,
      restaurantName: restaurant.toJSON().name,
    });

    response.status(201).json({
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.log(error);

    next(createError(500, "Table booking failed!"));
  }
};

// Update a booking
export const updateBooking = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { bookingStatus, startTime, endTime } = request.body as RequestBody;

  const booking = await BookingModel.findByPk(request.params.id as string);

  if (!booking) return next(createError(404, "No booking found"));

  const bookedStartDateTime = new Date(startTime);
  const bookedEndDateTime = new Date(endTime);

  if (
    isNaN(bookedStartDateTime.getTime()) ||
    isNaN(bookedEndDateTime.getTime())
  ) {
    return next(createError(403, "Invalid date format"));
  }

  if (new Date() >= bookedStartDateTime) {
    return next(createError(403, "Cannot book a time in past!"));
  }

  const bookedHour = bookedStartDateTime.getUTCHours();
  const WORKING_HOURS = {
    START: 8,
    END: 17,
  };

  if (bookedHour < WORKING_HOURS.START || bookedHour >= WORKING_HOURS.END) {
    return next(
      createError(403, "You can only book within working hours (5 AM to 5 PM)!")
    );
  }

  const startOfHour = new Date(bookedStartDateTime);
  startOfHour.setMinutes(0, 0, 0);

  const endOfHour = new Date(bookedEndDateTime);
  endOfHour.setMinutes(0, 0, 0);

  const differenceInMilliseconds =
    bookedEndDateTime.getTime() - bookedStartDateTime.getTime();

  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  if (differenceInHours > 1)
    return next(createError(403, "Time must be same day and hour"));

  try {
    await BookingModel.update(
      {
        bookingStatus: bookingStatus as string,
        endTime: endTime,
        startTime: startTime,
      },
      { where: { id: request.params.id as string } }
    );

    response.status(200).json({
      status: "success",
      message: "Booking have been updated!",
      data: { ...request.body },
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
