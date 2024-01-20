import { update_contact_tag_by_id } from "./update_contact_tag_by_id";

export const handle_btn_clicks = (contact_id, config_data, custom_fields) => {
  const confirmation_btn = document.querySelector(".confirmation_btn");
  const cancel_btn = document.querySelector(".cancel_btn");
  const reschedule_btn = document.querySelector(".reschedule_btn");

  confirmation_btn.addEventListener("click", async () => {
    await update_contact_tag_by_id(
      contact_id,
      config_data.access_token,
      "appt confirmed"
    );
  });

  cancel_btn.addEventListener("click", async () => {
    await update_contact_tag_by_id(
      contact_id,
      config_data.access_token,
      "appt canceled"
    );
  });

  reschedule_btn.addEventListener("click", () => {
    window.open(custom_fields.reschedule_link, "_blank");
  });
};
