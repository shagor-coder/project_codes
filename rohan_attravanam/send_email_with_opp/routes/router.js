const express = require("express");
const { createUser } = require("../middlewares/create-user");
const { addOpportunity } = require("../middlewares/add-opportunity");
const { sendEmail } = require("../middlewares/send-email");
const { clearOpportunity } = require("../middlewares/clear-opportunity");
const formatRequest = require("../helpers/format-request");
const addNewUser = require("../firebase/db");

const _Router = express.Router();

_Router.post("/create-user", formatRequest, addNewUser);
// _Router.post("/add-opportunity", addOpportunity);
// _Router.post("/send-email", sendEmail);
// _Router.post("/clear-opportunity", clearOpportunity);

module.exports = _Router;
