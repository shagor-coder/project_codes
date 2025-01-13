import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.js";
import ClientRouter from "./routes/client.js";
import LocationRouter from "./routes/location.js";
import RestaurantRouter from "./routes/restaurant.js";
import TableRouter from "./routes/table.js";
import UserRouter from "./routes/user.js";
import BookingRouter from "./routes/booking.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/location", LocationRouter);
app.use("/api/restaurant", RestaurantRouter);
app.use("/api/table", TableRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/client", ClientRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(errorStatus).send(errorMessage);
});

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("Connected to MongoDB!!");
  } catch (error) {
    throw error;
  }
};

app.listen(PORT, "127.0.0.1", () => {
  connectToMongoDB();
  console.log(`Server live on http://127.0.0.1:${PORT}`);
});
