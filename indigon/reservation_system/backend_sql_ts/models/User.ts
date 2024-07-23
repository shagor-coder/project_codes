import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  users?: string;
  isActive?: boolean;
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
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: true }
);
