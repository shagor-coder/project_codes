import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";
import { Json } from "sequelize/types/utils";

interface UserAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  fullAddress: string;
  service_type: string;
  extra: Json;
}

export const UserModel: ModelDefined<
  UserAttributes,
  Optional<UserAttributes, "id">
> = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extra: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
