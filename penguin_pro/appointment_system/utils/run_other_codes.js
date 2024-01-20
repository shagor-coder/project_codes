import { create_info_html } from "./create_html_for_info";
import { find_contact_custom_fiels } from "./find_contact_custom_fields";
import { get_contact_appointment_by_id } from "./get_contact_appointment_by_id";
import { get_contact_by_id } from "./get_contact_by_id";
import { get_location_custom_fields } from "./get_location_custom_fields";
import { handle_btn_clicks } from "./handle_btn_clicks";
import { format_date_time } from "./separate_date_time";

export const run_other_codes = async (config_data, contact_id, location_id) => {
  try {
    const contact = await get_contact_by_id(
      contact_id,
      config_data.access_token
    );

    const appointment = await get_contact_appointment_by_id(
      contact_id,
      config_data.access_token
    );

    if (!appointment.id) return console.log("No appointments found!");

    const location_custom_field = await get_location_custom_fields(
      config_data.access_token,
      location_id
    );

    const contact_custom_field = find_contact_custom_fiels(
      contact.customFields,
      location_custom_field
    );

    const { only_start_date, only_start_time } = format_date_time(
      appointment.startTime
    );

    const updated_contact_data = {
      ...appointment,
      ...contact,
      ...contact_custom_field,
      only_start_date,
      only_start_time,
    };

    const appointment_con = document.querySelector("#appointment_con");
    const info_con = document.querySelector("#info_con");
    create_info_html(updated_contact_data, info_con, appointment_con);
    handle_btn_clicks(contact_id, config_data, contact_custom_field);
  } catch (error) {
    console.log(error);
  }
};
