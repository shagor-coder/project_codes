const express = require("express");
const dotenv = require("dotenv");
const _Router = require("./routes/router"); // Adjust the path as needed

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(_Router);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
