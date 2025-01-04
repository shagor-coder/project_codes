import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface BookingAttributes {
  id?: string;
  tableName: string;
  startTime: Date;
  endTime: Date;
  clientName: string;
  bookingStatus: string;
  numberOfGuest: string;
  clientId: string;
  locationId: string;
  tableId: string;
  restaurantName: string;
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
      primaryKey: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isFuture(value: Date) {
          if (value <= new Date()) {
            throw new Error("Start time must be in the future");
          }
        },
      },
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStart(value: Date) {
          if (this.startTime && value <= this.startTime) {
            throw new Error("End time must be after start time");
          }
        },
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
    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    numberOfGuest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
