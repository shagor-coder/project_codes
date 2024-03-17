import { UserModel } from "../models/user.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";

// Get all user under admin
export const getAllUser = async (req, res, next) => {
  try {
    const users = await UserModel.find({
      companyId: req.params.companyId,
    }).select("-password");

    if (!users.length) return next(createError(404, "Users not found"));

    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get the current user
export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id }).select(
      "-password"
    );
    if (!user) return next(createError(404, "User not found"));
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update the current user
export const createUser = async (req, res, next) => {
  const { password, ...other } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = new UserModel({
    ...other,
    password: hashedPassword,
    companyId: req.params.companyId,
  });

  try {
    const savedUser = await newUser.save();

    const { password: hashedPassword, ...other } = savedUser._doc;

    res.status(200).json({
      status: "success",
      message: "User have been created!",
      data: other,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update the current user
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id, companyId: req.params.companyId },
      req.body
    );

    if (!updatedUser) return next(createError(404, "User not available"));
    res
      .status(200)
      .json({ status: "success", message: "User have been updated!" });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Delete user account
export const deleteUser = async (req, res, next) => {
  const { companyId, id } = req.params;

  try {
    const deletedUser = await UserModel.findOneAndDelete({
      _id: id,
      $and: [
        {
          companyId: companyId,
        },
      ],
    });

    if (!deletedUser) return next(createError(404, "User not found!!"));

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};
