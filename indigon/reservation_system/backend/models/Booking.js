import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  tableName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: "Start time must be in the future",
    },
  },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startTime;
      },
      message: "End time must be after start time",
    },
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
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
  },
});

export const BookingModel = mongoose.model("Booking", BookingSchema);
