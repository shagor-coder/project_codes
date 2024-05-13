const express = require("express");
const path = require("path");
const _Router = express.Router();

_Router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

_Router.get("/auth/callback", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/callback.html"));
});

module.exports = _Router;
