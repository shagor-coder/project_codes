import express, { Request, Response } from "express";
import { createUser, getUser } from "../controller/User";
import { addAddress } from "../controller/Address";

const Router = express.Router();

Router.get("/");
Router.get("/user", getUser);
Router.post("/user", createUser);
Router.post("/address", addAddress);

export default Router;
