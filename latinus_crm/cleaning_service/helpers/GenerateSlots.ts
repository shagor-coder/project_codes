// Define the working hours
export const WORKING_HOURS_START = 9; // 9 AM
export const WORKING_HOURS_END = 17; // 5 PM

// Helper function to generate all possible slots within the working hours
export const generateSlots = () => {
  const slots = [];
  for (let hour = WORKING_HOURS_START; hour < WORKING_HOURS_END; hour++) {
    slots.push(`${hour}:00 - ${hour + 1}:00`);
  }
  return slots;
};

// Helper function to determine free slots
export const getFreeSlotsFromBookings = (bookings: any[]) => {
  const allSlots = generateSlots();
  const bookedHours = bookings.map((booking) =>
    new Date(booking.bookedTime).getHours()
  );
  const freeSlots = allSlots.filter(
    (slot, index) => !bookedHours.includes(WORKING_HOURS_START + index)
  );
  return freeSlots;
};
