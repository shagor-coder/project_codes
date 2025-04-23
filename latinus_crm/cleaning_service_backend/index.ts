import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./db";
import { UserRouter } from "./router/User";
import { AddressRouter } from "./router/Address";
import { ServiceRouter } from "./router/Service";
import { BookingRouter } from "./router/Booking";
import { SessionRouter } from "./router/Session";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(UserRouter);
app.use(AddressRouter);
app.use(ServiceRouter);
app.use(BookingRouter);
app.use(SessionRouter);

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
