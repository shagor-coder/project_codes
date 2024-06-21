import express, { Request, Response } from "express";
import { create_user } from "../controller/user";
import { create_address } from "../controller/Address";

const Router = express.Router();

Router.get("/");
Router.post("/user", create_user);
Router.post("/address", create_address);

export default Router;
