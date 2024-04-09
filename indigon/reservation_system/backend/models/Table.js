import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  bookingStatus: {
    type: String,
    default: "confirmed",
    enum: ["confirmed", "cancelled", "no-show"],
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
  },
});

const TableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tableLocation: {
      type: String,
      required: true,
    },
    restaurantId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
    maxPeople: {
      type: Number,
      required: true,
    },
    bookedTimes: [bookingSchema],
  },
  { timestamps: true }
);

export const TableModel = mongoose.model("Table", TableSchema);
