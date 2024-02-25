const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./router/router");
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/create", router);

app.listen(PORT, HOST, () => {
  console.log(`Port running at http://localhost:${PORT}`);
});
