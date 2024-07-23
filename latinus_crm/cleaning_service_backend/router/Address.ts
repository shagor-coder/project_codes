import express from "express";
import { addAddress } from "../controller/Address";

const AddressRouter = express.Router();

AddressRouter.post("/api/address", addAddress);

export { AddressRouter };
