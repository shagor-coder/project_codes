import express from "express";
import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
} from "../controller/Client";
import { loginClient } from "../controller/Authentication";
import { verifyUser } from "../utils/verifyToken";

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
