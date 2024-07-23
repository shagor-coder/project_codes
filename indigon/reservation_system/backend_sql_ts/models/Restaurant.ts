import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface RestaurantAttributes {
  id?: string;
  locationId: string;
  userId: string;
  name: string;
  description: string;
  addressLine: string;
  openingHours: number;
  closingHours: number;
  priceRange: string;
  bookingDuration: number;
}

export const RestaurantModel: ModelDefined<
  RestaurantAttributes,
  Optional<RestaurantAttributes, "id">
> = sequelize.define(
  "Restaurant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openingHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    closingHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceRange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);
