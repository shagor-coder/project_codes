const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const _Router = require("./routes/router"); // Adjust the path as needed

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(_Router);

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
  console.log(`Listening on port http://localhost:${PORT}`);
});
