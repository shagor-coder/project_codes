import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface ServicesAttributes {
  id?: string;
  cleanType: string;
  additionalRoom: string;
  additionalBathroom: string;
  userId?: string;
}

export const ServicesModel: ModelDefined<
  ServicesAttributes,
  Optional<ServicesAttributes, "id">
> = sequelize.define(
  "Services",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cleanType: {
      type: DataTypes.STRING,
      allowNull: false,
      values: [
        "Regular Clean",
        "Deep Cleaning",
        "Professional Deep Clean",
        "Cleaning Services Airbnb",
        "After Party Clean Up",
        "Balcony",
      ],
    },
    additionalRoom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additionalBathroom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
