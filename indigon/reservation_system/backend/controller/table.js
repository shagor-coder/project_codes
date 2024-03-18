import { RestaurantModel } from "../models/Restaurant.js";
import { TableModel } from "../models/Table.js";
import { createError } from "../utils/error.js";

// Create a new Table
export const createTable = async (req, res, next) => {
  try {
    const isRestaurant = await RestaurantModel.findOne({
      userId: req.user.id,
      $and: [{ _id: req.params.restaurantId }],
    });

    if (!isRestaurant) return next(createError(403, "Not Allowed!"));

    const newTable = new TableModel(req.body);

    const savedTable = await newTable.save();

    await isRestaurant.updateOne({
      $push: {
        tables: savedTable._id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Table added!",
      data: savedTable,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get all Tables under admin
export const getAllTable = async (req, res, next) => {
  try {
    const tables = await TableModel.find({
      restaurantId: req.params.restaurantId,
    });

    if (!tables.length) return next(createError(404, "Tables not found"));
    res.status(200).json({ staus: "success", data: tables });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get Table for current user
export const getTable = async (req, res, next) => {
  try {
    const table = await TableModel.findOne({
      _id: req.params.id,
    });

    if (!table) return next(createError(404, "Table not found"));

    res.status(200).json({ staus: "success", data: table });
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update current Table
export const updateTable = async (req, res, next) => {
  try {
    const updatedTable = await TableModel.findOneAndUpdate(
      {
        _id: req.params.id,
        $and: [{ restaurantId: req.params.restaurantId }],
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedTable) return next(createError(404, "Table not Found!!"));

    const { auth, ...other } = updatedTable._doc;

    res.status(200).json({
      status: "success",
      message: "Table updated successfully!",
      data: other,
    });
  } catch (error) {
    next(createError(500, "Table not Updated"));
  }
};

// Delete current Table
export const deleteTable = async (req, res, next) => {
  try {
    const findTable = await TableModel.findOne({
      _id: req.user.id,
      $and: [{ restaurantId: req.params.restaurantId }],
    });

    if (!findTable) return next(createError(404, "Table not Found"));

    if (findTable._id !== req.params.id)
      return next(createError(403, "Bad request!!"));

    await findTable.deleteOne();

    await RestaurantModel.updateOne(
      {
        userId: req.user.id,
        $and: [{ restaurantId: req.params.restaurantId }],
      },
      {
        $pull: {
          tables: findTable._id,
        },
      }
    );

    res
      .status(200)
      .json({ status: "success", message: "Table deleted successfully!" });
  } catch (error) {
    next(createError(500, "Table not Deleted"));
  }
};

// Public Table

// Book current Table
export const bookTable = async (req, res, next) => {
  try {
    const updatedTable = await TableModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          bookedTimes: req.body,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedTable) return next(createError(404, "Table not Found!!"));

    res.status(200).json({
      status: "success",
      message: "Table updated successfully!",
      bookedInfo: updatedTable.bookedTimes,
    });
  } catch (error) {
    next(createError(500, error));
  }
};

// Cancel Booking
export const cancelBooking = async (req, res, next) => {
  try {
    const findTable = await TableModel.findOne({
      _id: req.params.id,
    });

    if (!findTable) return next(createError(404, "Table not Found!!"));

    await findTable.updateOne({
      $pull: {
        bookedTimes: {
          _id: req.body.bookingId,
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: "Your Booking has been canceled!",
    });
  } catch (error) {
    next(createError(500, error));
  }
};
