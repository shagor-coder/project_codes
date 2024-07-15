// src/components/Calendar.js
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { isSameDay, isBefore } from "date-fns";

const BookingCalendar = ({ prevStep, values }) => {
  const [date, setDate] = useState(new Date());
  const [freeSlots, setFreeSlots] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/booking?date=${
          date.toISOString().split("T")[0]
        }`
      )
      .then((response) => {
        setFreeSlots(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [date]);

  const handleBooking = (time) => {
    axios
      .post("http://localhost:3000/api/booking", {
        email: "msh43320@gmail.com", // Replace with actual user ID
        bookedTime: new Date(date.setHours(time)).toISOString(),
      })
      .then((response) => {
        console.log(response);
        alert("Booking successful!");
      })
      .catch((error) => {
        console.error(error);
        alert("Booking failed!");
      });
  };

  const tileDisabled = ({ date, view }) => {
    // Disable past dates
    if (view === "month") {
      return isBefore(date, new Date());
    }
    return false;
  };

  return (
    <div>
      <h2>Select a Date and Time</h2>
      <Calendar
        onChange={setDate}
        value={date}
        showWeekNumbers
        tileDisabled={tileDisabled}
      />
      <h3>Available Slots</h3>
      <ul>
        {freeSlots.map((slot, index) => (
          <li key={index}>
            {slot}
            <button onClick={() => handleBooking(parseInt(slot.split(":")[0]))}>
              Book
            </button>
          </li>
        ))}
      </ul>
      <button onClick={prevStep}>Back</button>
    </div>
  );
};

export default BookingCalendar;
