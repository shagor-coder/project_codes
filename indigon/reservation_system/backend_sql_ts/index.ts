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
app.use("/api/restuarant", RestaurantRouter);
app.use("/api/table", TableRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/client", ClientRouter);

const errorHandler = (err: any, response: any) => {
  const errorStatus: number = err.status || 500;
  const errorMessage: string = err.message || "Something went wrong";

  response.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
};

app.use(errorHandler);

const connect_with_db = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Authentication successful!!");
    // await sequelize.sync({ force: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

app.listen(PORT, async () => {
  await connect_with_db();
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
