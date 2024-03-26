import express from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenu,
  getMenu,
  updateMenu,
} from "../controller/menu.js";
import { verifyUser } from "../utils/verifyToken.js";

const _Router = express.Router();

// Create a Menu
_Router.post("/", verifyUser, createMenu);

// Get all the Menus
_Router.get("/all", verifyUser, getAllMenu);

// Get the current Menu
_Router.get("/:id", verifyUser, getMenu);

// Update the current Menu
_Router.put("/:id", verifyUser, updateMenu);

// Delete the current Menu
_Router.delete("/:id", verifyUser, deleteMenu);

export default _Router;
