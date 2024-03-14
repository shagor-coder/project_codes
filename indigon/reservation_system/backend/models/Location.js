import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    locationId: {
      type: String,
      required: true,
    },
    auth: {
      access_token: {
        type: String,
        required: true,
      },
      refresh_token: {
        type: String,
        required: true,
      },
      expires_in: {
        type: Date,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const LocationModel = mongoose.model("Location", LocationSchema);
