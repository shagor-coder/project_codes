import { ClientModel } from "../models/Client.js";
import { RestaurantModel } from "../models/Restaurant.js";
import { TableModel } from "../models/Table.js";
import { createError } from "../utils/error.js";
import { format, parseISO } from "date-fns";

// Create a new Table
export const createTable = async (req, res, next) => {
  try {
    const newTable = new TableModel({
      ...req.body,
      restaurantId: req.params.restaurantId,
    });
    const savedTable = await newTable.save();
    await RestaurantModel.updateOne({
      _id: req.params.restaurantId,
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

    if (table.bookedTimes) {
      const infos = JSON.parse(JSON.stringify(table.bookedTimes));

      const updatedBookingInfo = infos.map((bt) => {
        console.log(bt);
        let obj = { ...bt };

        obj.startTime = format(bt.startTime, "d MMM yy h.mm a");
        obj.endTime = format(bt.endTime, "d MMM yy h.mm a");

        return obj;
      });

      res.status(200).json({
        status: "success",
        data: { ...table._doc, bookedTimes: updatedBookingInfo },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: table,
      });
    }
  } catch (error) {
    console.log(error);
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
    const findTable = await TableModel.findById(req.params.id);

    if (!findTable) return next(createError(404, "Table not Found"));

    await findTable.deleteOne();

    await RestaurantModel.updateOne(
      {
        _id: findTable.restaurantId,
      },
      {
        $pull: {
          tables: findTable._id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Table deleted successfully!",
      data: { id: findTable._id },
    });
  } catch (error) {
    next(createError(500, "Table not Deleted"));
  }
};

// Book current Table
export const bookTable = async (req, res, next) => {
  try {
    const client = await ClientModel.findById(req.user.id);

    if (!client) return next(createError(404, "Client not found!"));

    const updatedTable = await TableModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          bookedTimes: {
            ...req.body,
            clientName: client.name,
            clientId: client._id,
          },
        },
      },
      {
        new: true,
      }
    );

    if (!updatedTable) return next(createError(404, "Table not Found!!"));

    const bookingId =
      updatedTable.bookedTimes[updatedTable.bookedTimes.length - 1]._id;

    await ClientModel.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $push: {
          tables: {
            tableId: updatedTable._id,
            bookingId: bookingId,
            restaurantId: updatedTable.restaurantId,
          },
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Table updated successfully!",
      bookedInfo: bookingId,
    });
  } catch (error) {
    console.log(error);
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

    await ClientModel.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $pull: {
          tables: findTable._id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Your Booking has been canceled!",
    });
  } catch (error) {
    next(createError(500, error));
  }
};
