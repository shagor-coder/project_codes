import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 12,
    },
    tables: [
      {
        tableId: {
          type: mongoose.Types.ObjectId,
          ref: "Table",
        },

        bookingId: {
          type: mongoose.Types.ObjectId,
          ref: "Table",
        },
        restaurantId: {
          type: mongoose.Types.ObjectId,
          ref: "Restaurant",
        },
      },
    ],
  },
  { timestamps: true }
);

export const ClientModel = mongoose.model("Client", ClientSchema);
