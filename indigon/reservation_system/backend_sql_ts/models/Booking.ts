import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface BookingAttributes {
  id?: string;
  tableName: string;
  startTime: Date;
  endTime: Date;
  clientName: string;
  clientId: string;
  locationId: string;
  tableId: string;
  bookingStatus: string;
  restaurantId: string;
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
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        validator: function (value: any) {
          return value > new Date();
        },
        message: "Start time must be in the future",
      },
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        validator: function (value: any) {
          return value > new Date();
        },
        message: "End time must be after start time",
      },
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingStatus: {
      type: DataTypes.ENUM,
      defaultValue: "confirmed",
      values: ["confirmed", "cancelled", "no-show"],
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tableId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true }
);
