const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const get_webhook_data = require("./middlewares/get_webhook_data");
const createPdfWithSignature = require("./utils/create_pdf_with_signature");
const post_pdf_to_contact = require("./utils/post_pdf_to_contact");
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
