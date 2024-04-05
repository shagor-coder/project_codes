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
    addressLine: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
      required: false,
    },
    closingHours: {
      type: String,
      required: false,
    },
    priceRange: {
      type: String,
      required: false,
    },
    bookingDuration: {
      type: String,
      required: true,
    },
    additionalInfo: {
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
    featuredImage: {
      photoId: {
        type: String,
        required: true,
      },
      photoURL: {
        type: String,
        required: true,
      },
    },
    photos: [
      {
        photoId: {
          type: String,
          required: true,
        },
        photoURL: {
          type: String,
          required: true,
        },
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
