import { ClientModel } from "../models/Client.js";
import { UserModel } from "../models/user.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Sign up for a new account
export const registerUser = async (req, res, next) => {
  const { password } = req.body;
  const hasedPassword = await bcrypt.hash(password, 8);
  const newAdmin = new UserModel({ ...req.body, password: hasedPassword });
  try {
    const savedAdmin = await newAdmin.save();
    const { password: hashedPass, ...other } = savedAdmin._doc;
    res.status(200).json({
      status: "success",
      message: "User created successfully!",
      data: other,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Login to a account
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const isUser = await UserModel.findOne({ email: email });

    if (!isUser) return next(createError(404, "No user found!"));

    const isPassword = await bcrypt.compare(password, isUser.password);

    if (!isPassword)
      return next(createError(401, "email or password incorrect!"));

    const { isAdmin, _id, locations, name, email: userEmail } = isUser;

    const token = jwt.sign(
      { id: _id, isAdmin: isAdmin },
      process.env.JWT_SERVER_STRING
    );

    res.cookie("access_token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: 3600000,
      path: "/",
    });

    res.status(200).json({
      status: "success",
      message: "You're now authenticated!",
      data: {
        isAdmin,
        id: _id,
        locations: [...locations],
        name,
        email: userEmail,
      },
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Login to a account
export const loginClient = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const isUser = await ClientModel.findOne({ email: email });

    if (!isUser) return next(createError(404, "No user found!"));

    const isPassword = await bcrypt.compare(password, isUser.password);

    if (!isPassword)
      return next(createError(401, "email or password incorrect!"));

    const { id } = isUser;

    const token = jwt.sign({ id }, process.env.JWT_SERVER_STRING);

    res
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
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Logout the user or client
export const logout = async (req, res, next) => {
  try {
    res
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
  } catch (error) {
    next(createError(500, error.message));
  }
};
