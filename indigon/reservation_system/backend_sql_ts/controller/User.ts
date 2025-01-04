import { Request, Response, NextFunction } from "express";
import { LocationModel, UserModel } from "../models";
import { createError } from "../utils/error";
import bcrypt from "bcrypt";

type RequestBody = {
  id: string;
  password: string;
  name: string;
  email: string;
};

// Get all user under admin
export const getAllUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.findAll({
      // @ts-ignore
      where: { id: request.user.id as string },
      attributes: { exclude: ["password"] },
    });
    if (!users.length) return next(createError(404, "Users not found"));
    response.status(200).json({ status: "success", data: users });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Get the current user
export const getUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const isUser = await UserModel.findOne({
      // @ts-ignore
      where: { id: request.user.id as string },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: LocationModel,
          as: "location",
          attributes: {
            exclude: [
              "id",
              "userId",
              "access_token",
              "refresh_token",
              "expires_in",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    });

    if (!isUser) return next(createError(404, "User not found"));

    const user = isUser.toJSON();

    const { id, isAdmin, name, email } = user;

    response.status(200).json({
      status: "success",
      data: {
        id,
        isAdmin,
        name,
        email,
        // @ts-ignore
        locationId: user.location?.locationId || null,
      },
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Create a user
export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { password, id, ...other } = request.body as RequestBody;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    await UserModel.create({
      ...other,
      password: hashedPassword,
    });

    response.status(200).json({
      status: "success",
      message: "User have been created!",
      data: other,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Update the current user
export const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id, password, ...other } = request.body as RequestBody;
  try {
    const isUser = await UserModel.findOne({
      where: { id: id },
    });

    if (!isUser) next(createError(404, "User not found!"));

    response.status(200).json({
      status: "success",
      message: "User have been updated!",
      data: other,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Delete user account
export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  try {
    await UserModel.destroy({ where: { id: id } });
    response.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: { id: id },
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};
