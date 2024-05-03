import { handle_map_append, map_element } from "./create_map_html";
import { get_element_by_promise } from "./get_element_by_promise";
import { handle_auto_save } from "./handle_auto_save";
import { update_input_value } from "./update_input_value";

export const handle_auto_complete = async () => {
  if (map_element.isConnected) return console.log("Already addded");
  const address_input = await get_element_by_promise(
    '[name="contact.appt_opportunity_address"]',
    false
  );
  if (!address_input) return;

  handle_map_append(address_input);

  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "name"],
  };
  const autocomplete = new google.maps.places.Autocomplete(
    address_input,
    options
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const { address_components } = place;
    const postal_code_obj = address_components.find((ac) =>
      ac.types.includes("postal_code")
    );
    const postal_code = postal_code_obj ? postal_code_obj.short_name : "";
    const full_address = address_input.value?.replace("USA", "") + postal_code;
    update_input_value(address_input, full_address);

    const blur_event = new Event("blur");
    address_input.dispatchEvent(blur_event);
    handle_auto_save();
  });
};
