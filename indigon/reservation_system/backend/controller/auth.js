import { UserModel } from "../models/user.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Sign up for a new account
export const registerUser = async (req, res, next) => {
  const { password } = req.body;
  const hasedPassword = await bcrypt.hash(password, 8);

  if (req.user && req.user.isAdmin) req.body.companyId = req.user.id;

  const newUser = new UserModel({ ...req.body, password: hasedPassword });

  try {
    await newUser.save();
    res.status(200).json({
      status: "success",
      message: "User created successfully!",
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

    const { id, isAdmin } = isUser;

    const token = jwt.sign({ id, isAdmin }, process.env.JWT_SECRET_STRING);

    res
      .cookie("access_token", token, {
        secure: true,
        httpOnly: true,
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
