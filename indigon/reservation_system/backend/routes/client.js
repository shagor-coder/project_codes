import express from "express";
import {
  getClient,
  updateClient,
  deleteClient,
  createClient,
} from "../controller/client.js";
import { verifyUser } from "../utils/verifyToken.js";
import { loginClient } from "../controller/authentication.js";

const _Router = express.Router();

// Create a new Client
_Router.post("/", createClient);

// Create a new Client
_Router.post("/login", loginClient);

// Get the current Client
_Router.get("/", verifyUser, getClient);

// Update the current Client
_Router.put("/", verifyUser, updateClient);

// Delete the current Client
_Router.delete("/", verifyUser, deleteClient);

export default _Router;
