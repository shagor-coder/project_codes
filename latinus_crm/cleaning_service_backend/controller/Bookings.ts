import { Request, Response } from "express";
import { BookingModel, UserModel } from "../models";
import { Op } from "sequelize";
import {
  getFreeSlotsFromBookings,
  WORKING_HOURS_END,
  WORKING_HOURS_START,
} from "../helpers/GenerateSlots";
import moment from "moment-timezone";
interface bookingAttributes {
  id?: string;
  bookedTime: string;
  userId?: string;
}

const TIME_ZONE = "Asia/Dhaka";

export const addbooking = async (request: Request, response: Response) => {
  const { bookedTime, email } = request.body;

  try {
    const bookedDateTime = new Date(bookedTime);

    if (new Date() >= bookedDateTime) {
      return response
        .status(403)
        .json({ message: "You cannot book a time in the past!" });
    }

    const user = (await UserModel.findOne({
      raw: true,
      where: { email: email },
    })) as bookingAttributes | null;

    if (!user) return response.status(404).json({ message: "User not found!" });

    // Ensure the booked time is within working hours
    const bookedHour = bookedDateTime.getHours();

    if (
      bookedHour < Number(WORKING_HOURS_START) ||
      bookedHour >= Number(WORKING_HOURS_END)
    ) {
      return response
        .status(400)
        .json({ message: "You can only book within working hours!" });
    }

    // Check if the slot is already booked
    const existingBooking = await BookingModel.findOne({
      where: {
        bookedTime: {
          [Op.between]: [
            new Date(bookedDateTime.setMinutes(0, 0, 0)), // Start of the hour
            new Date(bookedDateTime.setMinutes(59, 59, 999)), // End of the hour
          ],
        },
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

export const getFreeSlots = async (request: Request, response: Response) => {
  try {
    const { date } = request.query;
    // Set your desired time zone
    const startDate = moment
      .tz(`${date}T0${WORKING_HOURS_START}:00:00`, TIME_ZONE)
      .toISOString();
    const endDate = moment
      .tz(`${date}T${WORKING_HOURS_END}:00:00`, TIME_ZONE)
      .toISOString();

    // Fetch all existing bookings for the specified date
    const existingBookings = await BookingModel.findAll({
      where: {
        bookedTime: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // Get free slots
    const freeSlots = getFreeSlotsFromBookings(existingBookings);

    if (freeSlots.length === 0) {
      return response
        .status(200)
        .json({ message: "No free slots available for the selected date." });
    }

    response.status(200).json({ message: "Success!", data: freeSlots });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};
