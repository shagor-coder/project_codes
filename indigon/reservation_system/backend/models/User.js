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
    companyId: {
      type: String,
      required: true,
    },
    locations: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
