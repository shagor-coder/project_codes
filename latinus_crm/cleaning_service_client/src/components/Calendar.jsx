// src/components/BookingCalendar.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment-timezone";
import { isBefore, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";

const TIME_ZONE = "Asia/Dhaka"; // Set your desired time zone

const BookingCalendar = ({ prevStep, values }) => {
  const [date, setDate] = useState(new Date());
  const [freeSlots, setFreeSlots] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const formattedDate = moment(date).tz(TIME_ZONE).format("YYYY-MM-DD");

    axios
      .get(`http://localhost:3000/api/booking?date=${formattedDate}`)
      .then((response) => {
        setFreeSlots(response.data.data);
        setIsBooked(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [date, isBooked]);

  const handleBooking = (time) => {
    const bookingDate = moment(date)
      .tz(TIME_ZONE)
      .set({
        hour: time,
        minute: 0,
        second: 0,
        millisecond: 0,
      })
      .toISOString();

    axios
      .post("http://localhost:3000/api/booking", {
        email: "msh43320@gmail.com", // Replace with actual user ID
        bookedTime: bookingDate,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user_data", JSON.stringify(values));
        navigate("/confirmation");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isPastDate = (date) => {
    return isBefore(date, new Date()) && !isToday(date, new Date());
  };

  const formatSlotTime = (slot) => {
    return moment(date)
      .tz(TIME_ZONE)
      .set({ hour: slot, minute: 0 })
      .format("hh:mm a");
  };

  return (
    <div className="formStep">
      <h2>Select a Date and Time</h2>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        minDate={new Date()}
        filterDate={(date) => !isPastDate(date)}
      />
      <h3>Available Slots</h3>
      <ul className="formSlotCon">
        {freeSlots.map((slot, index) => (
          <li key={index} className="formSlot">
            <span className="slotTime">{formatSlotTime(slot)}</span>
            <button onClick={() => handleBooking(slot)} className="slotButton">
              Reserve
            </button>
          </li>
        ))}
      </ul>
      <div className="formButtonCon">
        <button onClick={prevStep}>Back</button>
      </div>
    </div>
  );
};

export default BookingCalendar;
