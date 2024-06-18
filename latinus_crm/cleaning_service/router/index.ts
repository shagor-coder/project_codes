import express, { Request, Response } from "express";
import { create_user } from "../controller/user";

const Router = express.Router();

Router.get("/");
Router.post("/user", create_user);

export default Router;
