import { format } from "date-fns";
import { Request, Response, NextFunction } from "express";
import { BookingModel, ClientModel, TableModel } from "../models";
import { createError } from "../utils/error";

type RequestBody = {
  id?: string;
  name: string;
  description: string;
  tableLocation: string;
  restaurantId: string;
  maxPeople: number;
};

type BookingRequestBody = {
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

// Create a new Table
export const createTable = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const newTable = await TableModel.create({
      ...(request.body as RequestBody),
      restaurantId: request.params.restaurantId as string,
    });

    response.status(200).json({
      status: "success",
      message: "Table added!",
      data: newTable,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get all Tables under admin
export const getAllTable = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const tables = await TableModel.findAll({
      where: {
        restaurantId: request.params.restaurantId as string,
      },
    });

    if (!tables.length) return next(createError(404, "Tables not found"));
    response.status(200).json({ staus: "success", data: tables });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get Table for current user
export const getTable = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const table = await TableModel.findByPk(request.params.id as string, {
      include: [
        {
          model: BookingModel,
          as: "bookings",
        },
      ],
    });

    if (!table) return next(createError(404, "Table not found"));

    response.status(200).json({
      status: "success",
      data: table,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Update current Table
export const updateTable = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const updatedTable = await TableModel.update({}, { where: {} });

    if (!updatedTable) return next(createError(404, "Table not Found!!"));

    response.status(200).json({
      status: "success",
      message: "Table updated successfully!",
      data: updatedTable,
    });
  } catch (error: any) {
    next(createError(500, "Table not Updated"));
  }
};

// Delete current Table
export const deleteTable = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const findTable = await TableModel.destroy({
      where: { id: request.params.id as string },
    });

    if (!findTable) return next(createError(404, "Table not Found"));

    response.status(200).json({
      status: "success",
      message: "Table deleted successfully!",
      data: { id: request.params.id },
    });
  } catch (error: any) {
    next(createError(500, "Table not Deleted"));
  }
};

// Book current Table
export const bookTable = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id, tableId, restaurantId, clientId, locationId, ...other } =
    request.body as BookingRequestBody;

  try {
    // @ts-ignore
    const client = await ClientModel.findByPk(request.user.id as string);

    if (!client) return next(createError(404, "Client not found!"));

    const newBooking = await BookingModel.create({
      tableId: tableId as string,
      restaurantId: restaurantId as string,
      clientId: client.toJSON().id as string,
      locationId: locationId as string,
      ...other,
    });

    response.status(200).json({
      status: "success",
      message: "Table updated successfully!",
      bookedInfo: { ...other, id: newBooking.toJSON().id as string },
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Cancel Booking
export const cancelBooking = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const updatedBooking = await BookingModel.update({}, { where: {} });
    response.status(200).json({
      status: "success",
      message: "Your Booking has been canceled!",
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};
