import { google_api } from "./api_key";
import { add_search_auto_complete } from "./helpers/add_search_auto_complete";
import { center_radio_label } from "./helpers/center_radio_label";
import { hide_next_btn_for_radio } from "./helpers/hide_next_btn_for_radio";
import { select_dom_element } from "./helpers/select_dom_element";

const main_fn = async () => {
  await center_radio_label();
  hide_next_btn_for_radio();

  const api_url = google_api || "";

  const script = document.createElement("script");
  script.src = api_url;
  document.querySelector("head").appendChild(script);

  const street_adress_input = await select_dom_element(
    '#_builder-form input[name="address"]'
  );

  const city_input = await select_dom_element(
    "#_builder-form input[name='city']"
  );

  const state_input = await select_dom_element(
    "#_builder-form input[name='state']"
  );

  const postal_code_input = await select_dom_element(
    "#_builder-form input[name='postal_code']"
  );

  if (!street_adress_input || !city_input || !state_input || !postal_code_input)
    return;

  const adress_inputs = {
    street_adress_input: street_adress_input,
    city_input: city_input,
    state_input: state_input,
    postal_code_input: postal_code_input,
  };

  add_search_auto_complete(adress_inputs);

  document.querySelector("#_builder-form")?.classList.add("form_loaded");
};

main_fn();
