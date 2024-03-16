import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      default: "",
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
  },
  { timestamps: true }
);

export const LocationModel = mongoose.model("Location", LocationSchema);
