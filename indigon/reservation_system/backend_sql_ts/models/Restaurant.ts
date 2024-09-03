import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface RestaurantAttributes {
  id?: string;
  locationId: string;
  userId: string;
  name: string;
  description: string;
  addressLine: string;
  openingHours: string;
  closingHours: string;
  priceRange: string;
  bookingDuration: string;
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
      primaryKey: true,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    closingHours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceRange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingDuration: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cuisines: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diningStyle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dressCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parkingDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    executiveChef: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentOptions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
