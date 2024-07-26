import express from "express";
import { createSession } from "../controller/Session";

const SessionRouter = express.Router();

SessionRouter.post("/api/session", createSession);

export { SessionRouter };
