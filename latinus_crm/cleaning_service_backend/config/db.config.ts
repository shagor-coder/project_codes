import dotenv from "dotenv";

dotenv.config();

type db_config = {
  db_url: string;
  db_username: string;
  db_password: string;
  db_name: string;
};

export const db_config: db_config = {
  db_url: process.env.DB_URL as string,
  db_username: process.env.DB_USERNAME as string,
  db_password: process.env.DB_PASSWORD as string,
  db_name: process.env.DB_NAME as string,
};
