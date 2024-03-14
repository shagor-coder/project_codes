import { UserModel } from "../models/user.js";
import { createError } from "../utils/error.js";

// Get all user under admin
export const getAllUser = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(createError(401, "Only admin is allowed!"));

  try {
    const users = await UserModel.find({ companyId: req.user.id }).select(
      "-password"
    );

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
export const updateUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res
      .status(200)
      .json({ status: "success", message: "User have been updated!" });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Delete user account
export const deleteUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};
