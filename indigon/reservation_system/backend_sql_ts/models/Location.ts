import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface LocationAttributes {
  id?: string;
  userId: string;
  locationId: string;
  access_token: string;
  refresh_token: string;
  expires_in: Date;
}

export const LocationModel: ModelDefined<
  LocationAttributes,
  Optional<LocationAttributes, "id">
> = sequelize.define(
  "Location",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true }
);
