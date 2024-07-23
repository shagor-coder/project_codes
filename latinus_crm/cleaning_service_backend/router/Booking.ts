import express from "express";
import { addbooking, getFreeSlots } from "../controller/Bookings";

const BookingRouter = express.Router();

BookingRouter.post("/api/booking", addbooking);
BookingRouter.get("/api/booking", getFreeSlots);

export { BookingRouter };
