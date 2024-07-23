import express from "express";
import { addServices } from "../controller/Services";

const ServiceRouter = express.Router();

ServiceRouter.post("/api/service", addServices);

export { ServiceRouter };
