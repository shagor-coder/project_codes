import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface AssetsAttributes {
  id?: string;
  restaurantId: string;
  photoURL: string;
  photoId: string;
  isFeatured: boolean;
}

export const AssetsModel: ModelDefined<
  AssetsAttributes,
  Optional<AssetsAttributes, "id">
> = sequelize.define(
  "Assets",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: true }
);
