import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    locationId: {
      type: String,
      required: true,
    },
    tables: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
