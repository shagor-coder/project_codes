const express = require("express");
const formatUserRequest = require("../helpers/format-user-request");
const formatOpportunityRequest = require("../helpers/format-opportunity-request");
const sendEmailToAdmin = require("../controllers/send-email");
const {
  addOpportunity,
  clearOpportunities,
} = require("../controllers/opportunity");
const { createUser } = require("../controllers/user");

const _Router = express.Router();

_Router.post("/create-user", formatUserRequest, createUser);
_Router.post("/add-opportunity", formatOpportunityRequest, addOpportunity);
_Router.post("/send-email", sendEmailToAdmin);
_Router.post("/clear-opportunity", clearOpportunities);

module.exports = _Router;
