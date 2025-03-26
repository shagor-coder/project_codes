import express, { Express } from "express";
import bodyParser from "body-parser";

import _Router from "./router";
import { sequelize } from "./db";

const PORT = process.env.PORT || 3300;
const app: Express = express();

// ✅ Limit Request Size to Reduce Memory Usage
app.use(bodyParser.json({ limit: "512kb" })); // Limit JSON body size
app.use(bodyParser.urlencoded({ extended: true, limit: "512kb" })); // Limit form data size

// ✅ Use Lightweight Router
app.use(_Router);

const connectWithDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// ✅ Start Server with Low Memory Footprint
app.listen(PORT, async () => {
  await connectWithDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
