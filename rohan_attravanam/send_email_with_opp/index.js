const express = require("express");
const _Router = require("./routes/router");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const app = express();

app.use(_Router);

app.listen(PORT, HOST, () => {
  console.log(`Port running at http://localhost:${PORT}`);
});
