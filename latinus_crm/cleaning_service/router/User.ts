import express from "express";
import { createUser, deleteUser, getUser } from "../controller/User";

const UserRouter = express.Router();

UserRouter.get("/api/user", getUser);
UserRouter.post("/api/user", createUser);
UserRouter.delete("/api/user", deleteUser);

export { UserRouter };
