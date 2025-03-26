import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface AgencyAttributs {
  id?: string;
  access_token: string;
  refresh_token: string;
  companyId: string;
  expires_in: Date;
}

export const AgencyModel: ModelDefined<
  AgencyAttributs,
  Optional<AgencyAttributs, "id">
> = sequelize.define(
  "Agency",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
