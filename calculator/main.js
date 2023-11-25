import { calculator_data } from "./utils/calculator.data";
import {
  generate_calculator_elements,
  next_button,
  calculator,
  calculator_header,
  step_els,
} from "./utils/calculator.html";
import { handle_input_events } from "./utils/calculator.input.handler";

import styles from "./style.css?inline";
import { handle_enable_disable_button } from "./utils/calculator.enable.disable";
import { append_cost_estimates } from "./utils/calculator.append.estimate";

const style_tag = document.createElement("style");
style_tag.innerHTML = styles;

const head_tag = document.querySelector("head");

head_tag.append(style_tag);

// Inserting Libraries

const google_script = document.createElement("script");
google_script.src = "https://maps.googleapis.com/maps/api/js?key==places";
const fa_script = document.createElement("script");
fa_script.src = "https://kit.fontawesome.com/8aeafc3531.js";
fa_script.crossOrigin = "anonymous";

head_tag.append(fa_script);
head_tag.append(google_script);

calculator.prepend(calculator_header);
generate_calculator_elements(calculator);
calculator.append(next_button);

const all_inputs = [
  ...calculator.querySelectorAll(
    "input:not(input[data-key='full_address'],select[data-key='utility_offset']),select"
  ),
];

const utility_offset = calculator.querySelector(
  "select[data-key='utility_offset']"
);

utility_offset.addEventListener("change", () => {
  const offset = utility_offset.value
    .trim()
    .replaceAll("Offset", "")
    .replaceAll("%", "");

  append_cost_estimates(step_els[3], Number(offset / 100));
});

all_inputs.forEach(handle_input_events);

const adress_input = calculator.querySelector("input[data-key='full_address']");

const check_google_loaded = () => {
  const autocomplete = new google.maps.places.Autocomplete(adress_input, {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });

  autocomplete.addListener("place_changed", async () => {
    const places = autocomplete.getPlace();
    const { address_components, name } = places;

    //const street_adress = name;
    const city_obj = address_components.find((ac) => {
      return ac.types.includes("locality");
    });
    const state_obj = address_components.find((ac) => {
      return ac.types.includes("administrative_area_level_1");
    });
    const postal_code_obj = address_components.find((ac) => {
      return ac.types.includes("postal_code");
    });

    const event = new Event("blur");
    adress_input.dispatchEvent(event);

    calculator_data.step_1.city = city_obj ? city_obj.long_name : "";
    calculator_data.step_1.state = state_obj ? state_obj.long_name : "";
    calculator_data.step_1.postal_code = postal_code_obj
      ? postal_code_obj.long_name
      : "";
    calculator_data.step_1.full_address = adress_input.value;
    handle_enable_disable_button("step_1");
  });
};

google_script.addEventListener("load", () => {
  check_google_loaded();
});
