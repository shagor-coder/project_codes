import { UserModel } from "../models/user.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";

// Get all user under admin
export const getAllUser = async (req, res, next) => {
  try {
    const currentAdmin = await UserModel.find({ _id: req.user.id })
      .populate("users", "-password")
      .select("-password");

    if (!currentAdmin) return next(createError(404, "Users not found"));

    res.status(200).json({ status: "success", data: currentAdmin });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get the current user
export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.id,
    })
      .populate("locations")
      .select("-password");

    if (!user) return next(createError(404, "User not found"));
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Create a user
export const createUser = async (req, res, next) => {
  const { password, ...other } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = new UserModel({
    ...other,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();

    await UserModel.updateOne(
      {
        _id: req.user.id,
      },
      {
        $push: {
          users: savedUser._id,
        },
      }
    );

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
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) return next(createError(404, "User not available"));

    const { password: hashedPassword, ...other } = updatedUser._doc;

    res.status(200).json({
      status: "success",
      message: "User have been updated!",
      data: other,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Delete user account
export const deleteUser = async (req, res, next) => {
  try {
    const findUser = await UserModel.findOne({ _id: req.user.id });

    if (!findUser) return next(createError(404, "User not available"));

    if (findUser._id !== req.params.id)
      return next(createError(403, "Bad request"));

    await findUser.deleteOne();

    await UserModel.updateOne(
      {
        _id: req.user.id,
      },
      {
        $pull: {
          users: findUser._id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};
