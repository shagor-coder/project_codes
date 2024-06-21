import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface AddressAttributes {
  id?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  user_id?: string;
}

export const AddressModel: ModelDefined<
  AddressAttributes,
  Optional<AddressAttributes, "id">
> = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    timestamps: true,
  }
);
