import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    additionalInfo: {
      addressLine: {
        type: String,
        required: false,
      },
      priceRange: {
        type: String,
        required: false,
      },
      cuisines: {
        type: String,
        required: false,
      },
      diningStyle: {
        type: String,
        required: false,
      },
      dressCode: {
        type: String,
        required: false,
      },
      parkingDetails: {
        type: String,
        required: false,
      },
      executiveChef: {
        type: String,
        required: false,
      },
      paymentOptions: {
        type: String,
        required: false,
      },
      website: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
    },
    photos: {
      type: [String],
      required: false,
    },
    menus: [
      {
        type: Object,
        ref: "Menu",
      },
    ],
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
