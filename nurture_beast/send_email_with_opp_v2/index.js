const express = require("express");
const dotenv = require("dotenv");
const _Router = require("./routes/router"); // Adjust the path as needed
const sequelize = require("./db/db_config");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(_Router);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("DB Authentication successful!!");
  } catch (error) {
    throw new Error(error);
  }
};

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Listening on port http://localhost:${PORT}`);
});
