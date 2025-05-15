import { Sequelize } from "sequelize";
import { dbConfig } from "../config/db.config";

export const sequelize = new Sequelize(
  dbConfig.db_name,
  dbConfig.db_username,
  dbConfig.db_password,
  {
    host: dbConfig.db_url,
    dialect: "mysql",
  }
);
