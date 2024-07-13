import { Request, Response } from "express";
import { BookingModel, UserModel } from "../models";

interface bookingAttributes {
  id?: string;
  bookedTime: string;
  userId?: string;
}

export const addbooking = async (request: Request, response: Response) => {
  const { bookedTime, email } = request.body;

  try {
    const user = (await UserModel.findOne({
      raw: true,
      where: { email: email },
    })) as bookingAttributes | null;

    if (!user) return response.status(404).json({ message: "User not found!" });

    // Check for existing bookings
    const existingBooking = await BookingModel.findOne({
      where: {
        userId: user.id,
        bookedTime,
      },
    });

    if (existingBooking)
      return response.status(403).json({ message: "Booking is already there" });

    const booking = await BookingModel.create({
      bookedTime: bookedTime,
      userId: user.id,
    });

    await booking.save();
    response.status(200).json({ message: "Success!", data: booking });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};
