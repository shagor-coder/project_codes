import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface BookingAttributes {
  id?: string;
  bookedTime: string;
  userId?: string;
}

export const BookingModel: ModelDefined<
  BookingAttributes,
  Optional<BookingAttributes, "id">
> = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookedTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
