import {
  add_search_auto_complete_for_contacts,
  add_search_auto_complete_for_opportunities,
} from "./add_search_auto_complete";
import { google_maps_icons_container } from "./create_html";
import select_element_by_promise from "./selec_element_by_promise";

export async function handle_maps_icons_insert_for_contact() {
  const stret_adress_con = await select_element_by_promise(
    '.hl_contact-details-left [id="contact.address1"]'
  );
  if (!stret_adress_con) return;
  stret_adress_con.style = `
	  position: relative !important;
	`;

  const street_adress_input = await select_element_by_promise(
    '.hl_contact-details-left input[name="contact.address1"]'
  );

  const city_input = await select_element_by_promise(
    ".hl_contact-details-left input[name='contact.city']"
  );

  const state_input = await select_element_by_promise(
    ".hl_contact-details-left input[name='contact.state']"
  );

  const postal_code_input = await select_element_by_promise(
    ".hl_contact-details-left input[name='contact.postal_code']"
  );

  if (!street_adress_input || !city_input || !state_input || !postal_code_input)
    return;

  const adress_inputs = {
    street_adress_input: street_adress_input,
    city_input: city_input,
    state_input: state_input,
    postal_code_input: postal_code_input,
  };

  await add_search_auto_complete_for_contacts(adress_inputs);
  stret_adress_con.append(google_maps_icons_container);
}

export async function handle_maps_icons_insert_for_opportunities() {
  const property_address_el = await select_element_by_promise(
    "#opportunitiesForm input[placeholder='Property Address'"
  );

  if (!property_address_el)
    return console.log("Property Address element not found");

  await add_search_auto_complete_for_opportunities(property_address_el);
  const main_parent =
    property_address_el.offsetParent.offsetParent.offsetParent.offsetParent
      .parentElement;
  main_parent.style.position = "relative";
  main_parent.append(google_maps_icons_container);
}

export async function handle_opportunity_card_click() {
  const opportunities_cards = await select_element_by_promise(
    ".opportunitiesCard",
    "multi"
  );

  if (!opportunities_cards.length)
    return console.log("No opportunity cards found");

  opportunities_cards.forEach((opp_card) => {
    opp_card.addEventListener(
      "click",
      handle_maps_icons_insert_for_opportunities
    );
  });
}
