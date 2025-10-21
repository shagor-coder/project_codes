import {
  add_search_auto_complete_for_contacts,
  add_search_auto_complete_for_opportunities,
} from "./add_search_auto_complete";
import { google_maps_icons_container } from "./create_html";
import select_element_by_promise from "./selec_element_by_promise";

export const google_input = document.createElement("input");
google_input.classList = `custom_google_input`;

export async function handle_maps_icons_insert_for_contact() {
  const street_adress_con = await select_element_by_promise(
    "#record-details-lhs #hlD1NmCkGSCTGUEMIfRU-form-item"
  );
  if (!street_adress_con) return;
  street_adress_con.style = `
	  position: relative !important;
	`;

  street_adress_con.append(google_input);

  await add_search_auto_complete_for_contacts(google_input, street_adress_con);
  street_adress_con.append(google_maps_icons_container);
}

export async function handle_maps_icons_insert_for_opportunities() {
  if (google_maps_icons_container.isConnected)
    google_maps_icons_container.remove();

  const property_address_el = await select_element_by_promise(
    "#opportunitiesCustomFieldForm input[placeholder='Property Address'"
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
  if (google_maps_icons_container.isConnected) return;

  const opportunities_modal_custom_field_form = await select_element_by_promise(
    "#opportunitiesCustomFieldForm"
  );

  if (opportunities_modal_custom_field_form)
    return await handle_maps_icons_insert_for_opportunities();

  const opportunities_cards = await select_element_by_promise(
    ".opportunitiesCard",
    "multi"
  );

  if (!opportunities_cards.length)
    return console.log("No opportunity cards found");

  opportunities_cards.forEach((opp_card) => {
    opp_card.removeEventListener(
      "click",
      handle_maps_icons_insert_for_opportunities
    );
  });

  opportunities_cards.forEach((opp_card) => {
    opp_card.addEventListener(
      "click",
      handle_maps_icons_insert_for_opportunities
    );
  });
}

export async function handle_edit_opportunity_card() {
  const opportunities_modal_custom_field_form = await select_element_by_promise(
    "#opportunitiesCustomFieldForm"
  );

  if (opportunities_modal_custom_field_form)
    return await handle_maps_icons_insert_for_opportunities();

  const opportunity_edit_buttons = await select_element_by_promise(
    ".hl_contact-details-center .opportunityCard button",
    "multi"
  );

  if (!opportunity_edit_buttons.length)
    return console.log("No opportunity cards found");

  opportunity_edit_buttons.forEach((opp_button) => {
    opp_button.removeEventListener(
      "click",
      handle_maps_icons_insert_for_opportunities
    );
  });

  opportunity_edit_buttons.forEach((opp_button) => {
    opp_button.addEventListener(
      "click",
      handle_maps_icons_insert_for_opportunities
    );
  });
}
