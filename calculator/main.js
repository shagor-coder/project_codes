import { calculator_data } from "./utils/calculator.data";
import {
  generate_calculator_elements,
  next_button,
  step_els,
} from "./utils/calculator.html";
import { handle_input_events } from "./utils/calculator.input.handler";
const calculator = document.getElementById("calculator");

generate_calculator_elements(calculator);
calculator.append(next_button);

const all_inputs = [
  ...calculator.querySelectorAll(
    "input:not(input[data-key='full_address']),select"
  ),
];

all_inputs.forEach(handle_input_events);

const adress_input = calculator.querySelector("input[data-key='full_address']");

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
    return ac.types.includes("locality") && ac.types.includes("political");
  });
  const state_obj = address_components.find((ac) => {
    return ac.types.includes("administrative_area_level_1");
  });
  const postal_code_obj = address_components.find((ac) => {
    return ac.types.includes("postal_code");
  });

  const event = new Event("blur");
  adress_input.dispatchEvent(event);

  calculator_data.step_1.city = city_obj.long_name ? city_obj.long_name : "";
  calculator_data.step_1.state = state_obj.long_name ? state_obj.long_name : "";
  calculator_data.step_1.postal_code = postal_code_obj.long_name
    ? postal_code_obj.long_name
    : "";
  calculator_data.step_1.full_address = adress_input.value;
  next_button.disabled = "";
});
