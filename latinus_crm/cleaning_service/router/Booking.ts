import express from "express";
import { addbooking } from "../controller/Bookings";

const BookingRouter = express.Router();

BookingRouter.post("/api/booking", addbooking);

export { BookingRouter };
