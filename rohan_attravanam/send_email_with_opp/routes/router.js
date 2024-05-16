const express = require("express");
const formatUserRequest = require("../helpers/format-user-request");
const createUser = require("../middlewares/create-user");
const addOpportunity = require("../middlewares/add-opportunity");
const formatOpportunityRequest = require("../helpers/format-opportunity-request");
const sendEmailToAdmin = require("../middlewares/send-email");
const getOpportunities = require("../middlewares/get-opportunities");
const getUser = require("../middlewares/get-user");

const _Router = express.Router();

_Router.post("/create-user", formatUserRequest, createUser);
_Router.post("/add-opportunity", formatOpportunityRequest, addOpportunity);
_Router.post("/send-email", getUser, getOpportunities, sendEmailToAdmin);
// _Router.post("/clear-opportunity", clearOpportunity);

module.exports = _Router;
