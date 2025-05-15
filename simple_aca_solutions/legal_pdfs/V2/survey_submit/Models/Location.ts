import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface LocationAttributes {
  id?: string;
  locationId: string;
  name: string;
  email: string;
  phone: string;
  access_token: string;
  refresh_token: string;
  companyId: string;
  expires_in: Date;
  notesEnabled?: boolean;
  summaryEnabled?: boolean;
  nurtureAiEnabled?: boolean;
  lastLoginDate?: Date;
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
      primaryKey: true,
    },
    locationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
