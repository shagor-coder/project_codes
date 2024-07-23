import moment from "moment-timezone";

// Define the working hours
export const WORKING_HOURS_START = 9; // 9 AM
export const WORKING_HOURS_END = 17; // 5 PM

// Helper function to generate all possible slots within the working hours
export const generateSlots = () => {
  const slots = [];
  for (let hour = WORKING_HOURS_START; hour < WORKING_HOURS_END; hour++) {
    slots.push(hour);
  }
  return slots;
};

// Helper function to determine free slots
export const getFreeSlotsFromBookings = (bookings: any[]) => {
  const allSlots = generateSlots();
  const bookedHours = bookings.map((booking) =>
    moment(booking.bookedTime).hours()
  );

  const freeSlots = allSlots.filter((slot) => !bookedHours.includes(slot));
  return freeSlots;
};
