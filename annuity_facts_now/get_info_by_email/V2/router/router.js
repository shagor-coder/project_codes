const express = require("express");
const path = require("path");
const get_webhook_data = require("../middlewares/get_webhook_data");
const get_info_by_email = require("../middlewares/get_info_by_email");
const update_contact_info = require("../controller/update_contact_info");
const _Router = express.Router();

_Router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

_Router.post(
  "/get-info",
  get_webhook_data,
  get_info_by_email,
  update_contact_info
);

module.exports = _Router;
