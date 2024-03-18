import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    locationId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Location",
      },
    ],
    tables: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Table",
      },
    ],
  },
  { timestamps: true }
);

export const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
