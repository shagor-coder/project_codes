import dotenv from "dotenv";

dotenv.config();

type dbConfig = {
  db_url: string;
  db_username: string;
  db_password: string;
  db_name: string;
};

export const dbConfig: dbConfig = {
  db_url: process.env.DB_URL as string,
  db_username: process.env.DB_USERNAME as string,
  db_password: process.env.DB_PASSWORD as string,
  db_name: process.env.DB_NAME as string,
};

export const appConfig: { webhook_signature: string } = {
  webhook_signature: process.env.WEBHOOK_SECRET_KEY as string,
};
