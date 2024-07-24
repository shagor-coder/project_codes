import { Request, Response, NextFunction } from "express";
import { ClientModel } from "../models";
import { createError } from "../utils/error";
import bcrypt from "bcrypt";

type RequestBody = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

// Get the current Client
export const getClient = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const client = await ClientModel.findOne({
      where: { id: request.params.id as string },
    });

    if (!client) return next(createError(404, "Client not found"));
    response.status(200).json({ status: "success", data: client });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Create a Client
export const createClient = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { password, ...other } = request.body as RequestBody;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    await ClientModel.create({
      ...other,
      password: hashedPassword,
    });

    response.status(200).json({
      status: "success",
      message: "Client have been created!",
      data: other,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Update the current Client
export const updateClient = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { password, ...other } = request.body as RequestBody;

  try {
    const updatedClient = await ClientModel.update(
      { id: request.params.id as string },
      { where: {} }
    );

    response.status(200).json({
      status: "success",
      message: "Client have been updated!",
      data: other,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Delete Client account
export const deleteClient = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await ClientModel.destroy({
      where: { id: request?.params?.id as string },
    });

    response.status(200).json({
      status: "success",
      message: "Client deleted successfully",
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};
