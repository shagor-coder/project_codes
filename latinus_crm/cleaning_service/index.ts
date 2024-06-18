import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Router from "./router";
import { sequelize } from "./db";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Router);

const connect_with_db = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Authentication successful!!");
    await sequelize.sync({ alter: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

app.listen(PORT, async () => {
  await connect_with_db();
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
