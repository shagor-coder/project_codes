import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  tableName: {
    type: String,
    required: true,
  },
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
  locationId: {
    type: mongoose.Types.ObjectId,
    ref: "Location",
  },

  tableId: {
    type: mongoose.Types.ObjectId,
    ref: "Table",
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
  },
});

export const BookingModel = mongoose.model("Booking", BookingSchema);
