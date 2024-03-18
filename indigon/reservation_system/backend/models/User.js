import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    locations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Location",
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
