import { Sequelize } from "sequelize";
import { db_config } from "../config/db.config";

export const sequelize = new Sequelize(
  db_config.db_name,
  db_config.db_username,
  db_config.db_password,
  {
    host: db_config.db_url,
    dialect: "mysql",
  }
);
