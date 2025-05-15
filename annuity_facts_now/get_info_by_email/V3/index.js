const express = require("express");
const bodyParser = require("body-parser");
const _Router = require("./router/router");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const app = express();

app.use(bodyParser.json());

app.use(_Router);

app.listen(PORT, HOST, () => {
  console.log(`Port running at http://localhost:${PORT}`);
});
