import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface ClientAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export const ClientModel: ModelDefined<
  ClientAttributes,
  Optional<ClientAttributes, "id">
> = sequelize.define(
  "Client",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        contains: "@",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
        max: 12,
      },
    },
  },
  { timestamps: true }
);
