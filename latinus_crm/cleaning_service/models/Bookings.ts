import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface BookingAttributes {
  id?: string;
  userName: string;
  bookedTime: string;
  userId?: string;
}

export const BookingModel: ModelDefined<
  BookingAttributes,
  Optional<BookingAttributes, "id">
> = sequelize.define(
  "Bookings",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookedTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
