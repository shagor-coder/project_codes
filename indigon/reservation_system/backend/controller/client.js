import { ClientModel } from "../models/Client.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";

// Get the current Client
export const getClient = async (req, res, next) => {
  try {
    const client = await ClientModel.findOne({
      _id: req.user.id,
    }).select("-password");

    if (!client) return next(createError(404, "Client not found"));
    res.status(200).json({ status: "success", data: client });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Create a Client
export const createClient = async (req, res, next) => {
  const { password, ...other } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const newClient = new ClientModel({
    ...other,
    password: hashedPassword,
  });

  try {
    const savedClient = await newClient.save();
    const { password: hashedPassword, ...other } = savedClient._doc;

    res.status(200).json({
      status: "success",
      message: "Client have been created!",
      data: other,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update the current Client
export const updateClient = async (req, res, next) => {
  try {
    const updatedClient = await ClientModel.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedClient) return next(createError(404, "Client not available"));

    const { password: hashedPassword, ...other } = updatedClient._doc;

    res.status(200).json({
      status: "success",
      message: "Client have been updated!",
      data: other,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Delete Client account
export const deleteClient = async (req, res, next) => {
  try {
    const findClient = await ClientModel.findOne({ _id: req.user.id });

    if (!findClient) return next(createError(404, "Client not available"));

    await findClient.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Client deleted successfully",
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};
