import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface ServicesAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    additionalBathroom: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);
