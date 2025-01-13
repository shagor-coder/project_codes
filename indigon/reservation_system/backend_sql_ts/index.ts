import express, { Express, NextFunction, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AuthRouter from "./routes/Auth";
import ClientRouter from "./routes/Client";
import LocationRouter from "./routes/Location";
import RestaurantRouter from "./routes/Restaurant";
import TableRouter from "./routes/Table";
import UserRouter from "./routes/User";
import BookingRouter from "./routes/Booking";
import { sequelize } from "./db";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/location", LocationRouter);
app.use("/api/restaurant", RestaurantRouter);
app.use("/api/table", TableRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/client", ClientRouter);

//@ts-ignore
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  //@ts-ignore
  res.status(errorStatus).send(errorMessage);
});

const connect_with_db = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("DB Authentication successful!!");
  } catch (error: any) {
    throw new Error(error);
  }
};

app.listen(PORT, async () => {
  await connect_with_db();
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
