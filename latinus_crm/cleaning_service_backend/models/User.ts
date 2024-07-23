import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface UserAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
