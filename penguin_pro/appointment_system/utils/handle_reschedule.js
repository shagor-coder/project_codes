import { get_appointment_slots } from "./get_appointment_slots";

const get_formatted_time = (date_time_string) => {
  const date_time = new Date(date_time_string);

  date_time.toLocaleString("en-US", { timeZone: "America/Chihuahua" });

  const hours = date_time.getHours();
  const minutes = date_time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formatted_hours = hours % 12 || 12;

  const formatted_time = `${formatted_hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  return formatted_time;
};

export const handle_reschedule = async (config_data) => {
  const reschedule_form = document.querySelector("#reschedule_form");

  const { calendar_id, access_token } = config_data;

  const appointment_slots = await get_appointment_slots(
    calendar_id,
    access_token
  );
  console.log(appointment_slots);

  const keys = Object.keys(appointment_slots);

  keys.forEach((key) => {
    const slots = appointment_slots[key].slots;
    if (!slots) return;

    let headline = document.createElement("h2");
    headline.textContent = key;
    reschedule_form.appendChild(headline);

    slots.forEach((slot) => {
      let slot_btn = document.createElement("button");
      slot_btn.textContent = get_formatted_time(slot);
      slot_btn.classList = `slot-btn`;
      reschedule_form.appendChild(slot_btn);
    });
  });
};
