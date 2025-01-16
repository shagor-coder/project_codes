import express, { Express, NextFunction, Request, Response } from "express";
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
  origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5173"],
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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = (err as any).status || 500;
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: err.message, // Directly expose error.message
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log("✅ Database connection established successfully");
  } catch (error) {
    process.exit(1);
  }
};

const initServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

initServer();
