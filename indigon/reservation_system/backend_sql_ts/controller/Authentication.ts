import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import { ClientModel, LocationModel } from "../models";
import { UserModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error";

type RequestBody = {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
};

// Sign up for a new account
export const registerUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { isActive, password, ...rest } = request.body as RequestBody;

    const hasedPassword = await bcrypt.hash(password, 8);
    const newAdmin = await UserModel.create({
      ...rest,
      isActive: true,
      password: hasedPassword,
    });
    const { password: dbPassword, ...other } = newAdmin.toJSON();
    response.status(200).json({
      status: "success",
      message: "User created successfully!",
      data: other,
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Login to a account
export const loginUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body as RequestBody;

  try {
    const isUser = await UserModel.findOne({
      where: { email },
      include: [
        {
          model: LocationModel,
          as: "location",
          attributes: {
            exclude: [
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
      nest: true,
    });

    if (!isUser) return next(createError(404, "No user found!"));

    const user = isUser.toJSON();

    const { password: dbPassword, id, isAdmin, name } = user;

    const isPassword = await bcrypt.compare(password, dbPassword);

    if (!isPassword)
      return next(createError(401, "email or password incorrect!"));

    const token = jwt.sign(
      { id: id, isAdmin: isAdmin },
      process.env.JWT_SERVER_STRING as string
    );

    response.cookie("access_token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: 3600000,
      path: "/",
    });

    response.status(200).json({
      status: "success",
      message: "You're now authenticated!",
      data: {
        isAdmin,
        id: id,
        name,
        email: email,
        // @ts-ignore
        locationId: user?.location?.id || null,
      },
    });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Login to a account
export const loginClient = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body as RequestBody;

  try {
    const isUser = await ClientModel.findOne({
      where: { email: email },
      raw: true,
    });

    if (!isUser) return next(createError(404, "No user found!"));

    // @ts-ignore
    const { password: dbPassword, id } = isUser;

    const isPassword = await bcrypt.compare(password, dbPassword);

    if (!isPassword)
      return next(createError(401, "email or password incorrect!"));

    const token = jwt.sign({ id }, process.env.JWT_SERVER_STRING as string);

    response
      .cookie("access_token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        maxAge: 3600000,
        path: "/",
      })
      .status(200)
      .json({
        status: "success",
        message: "You're now authenticated!",
      });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};

// Logout the user or client
export const logout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response
      .cookie("access_token", "", {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        maxAge: 3600000,
        path: "/",
      })
      .status(200)
      .json({
        status: "success",
        message: "You're now logged out!",
      });
  } catch (error: any) {
    next(createError(500, error.message as string));
  }
};
