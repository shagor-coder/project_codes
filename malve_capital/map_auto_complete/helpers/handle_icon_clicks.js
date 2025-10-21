import select_element_by_promise from "./selec_element_by_promise";

async function handle_icons_click(e) {
  if (location.href.includes("/opportunities/list")) {
    const property_address_el = await select_element_by_promise(
      "#opportunitiesCustomFieldForm input[placeholder='Property Address'"
    );

    if (!property_address_el)
      return console.log("Property Address element not found");
    const full_adress = property_address_el.value.trim();
    if (e.target.parentElement.id.trim() === "zillow_button") {
      const z_link = "https://www.zillow.com/homes/" + full_adress;
      window.open(z_link, "_blank");
    }
    if (e.target.parentElement.id.trim() === "maps_button") {
      const maps_link = "https://google.com/maps/search/" + full_adress;
      window.open(maps_link, "_blank");
    }
    return;
  } else {
    const property_address_el = await select_element_by_promise(
      "#record-details-lhs  #hlD1NmCkGSCTGUEMIfRU-form-item .hr-input__text-content"
    );
    // const city_input = await select_element_by_promise(
    //   "# input[name='contact.city']"
    // );
    // const state_input = await select_element_by_promise(
    //   "# input[name='contact.state']"
    // );
    // const postal_code_input = await select_element_by_promise(
    //   "# input[name='contact.postal_code']"
    // );
    // if (
    //   !street_adress_input ||
    //   !city_input ||
    //   !state_input ||
    //   !postal_code_input
    // )
    //   return;

    // const full_adress = `${street_adress_input.value} ${city_input.value} ${state_input.value} ${postal_code_input.value}`;

    if (e.target.parentElement.id.trim() === "zillow_button") {
      const z_link =
        "https://www.zillow.com/homes/" + property_address_el.textContent.trim();
      window.open(z_link, "_blank");
    }
    if (e.target.parentElement.id.trim() === "maps_button") {
      const maps_link =
        "https://google.com/maps/search/" + property_address_el.textContent.trim();
      window.open(maps_link, "_blank");
    }
  }
}

export default handle_icons_click;
