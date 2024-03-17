import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import LocationRouter from "./routes/location.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/location", LocationRouter);

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

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server live on http://localhost:${PORT}`);
});
