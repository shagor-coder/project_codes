import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    locationId: {
      type: String,
      required: true,
      unique: true,
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
    restaurant: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
  },
  { timestamps: true }
);

export const LocationModel = mongoose.model("Location", LocationSchema);
