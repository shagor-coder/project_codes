import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../db";

interface TableAttributes {
  id?: string;
  name: string;
  description: string;
  tableLocation: string;
  restaurantId: string;
  maxPeople: number;
}

export const TableModel: ModelDefined<
  TableAttributes,
  Optional<TableAttributes, "id">
> = sequelize.define(
  "Table",

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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tableLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    maxPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);
