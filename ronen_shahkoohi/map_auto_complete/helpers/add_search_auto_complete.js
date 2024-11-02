import handle_auto_save, {
  handle_auto_save_for_opportunity,
} from "./handle_auto_save";
import update_adress_inputs from "./update_adress_input";

function initiate_auto_complete(input_el) {
  const autocomplete = new google.maps.places.Autocomplete(input_el, {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });

  return autocomplete;
}

export async function add_search_auto_complete_for_contacts(
  street_adress_input
) {
  // const { street_adress_input, city_input, state_input, postal_code_input } =
  //   adress_inputs;

  const autocomplete = initiate_auto_complete(street_adress_input);

  autocomplete.addListener("place_changed", async () => {
    const places = autocomplete.getPlace();
    const { address_components, name } = places;

    const street_adress = name;
    const city_obj = address_components.find((ac) => {
      return ac.types.includes("locality") && ac.types.includes("political");
    });

    const city_obj_2 = address_components.find((ac) => {
      return (
        ac.types.includes("sublocality_level_1") &&
        ac.types.includes("political")
      );
    });

    const state_obj = address_components.find((ac) => {
      return ac.types.includes("administrative_area_level_1");
    });
    const postal_code_obj = address_components.find((ac) => {
      return ac.types.includes("postal_code");
    });

    const full_adress = `${street_adress} ${
      city_obj ? city_obj.short_name : city_obj_2.short_name
    } ${state_obj ? state_obj.short_name : ""} ${
      postal_code_obj ? postal_code_obj.short_name : ""
    }`;

    update_adress_inputs(street_adress_input, full_adress);
    // update_adress_inputs(city_input, city_obj && city_obj.short_name);
    // update_adress_inputs(state_input, state_obj && state_obj.short_name);
    // update_adress_inputs(
    //   postal_code_input,
    //   postal_code_obj && postal_code_obj.short_name
    // );
    const event = new Event("blur");
    street_adress_input.dispatchEvent(event);

    await handle_auto_save();
  });
}

export async function add_search_auto_complete_for_opportunities(
  property_address_el = null
) {
  const autocomplete = initiate_auto_complete(property_address_el);
  autocomplete.addListener("place_changed", async () => {
    const places = autocomplete.getPlace();
    const { address_components, name } = places;

    const street_adress = name;

    const city_obj = address_components.find((ac) => {
      return ac.types.includes("locality") && ac.types.includes("political");
    });

    const city_obj_2 = address_components.find((ac) => {
      return (
        ac.types.includes("sublocality_level_1") &&
        ac.types.includes("political")
      );
    });

    const state_obj = address_components.find((ac) => {
      return ac.types.includes("administrative_area_level_1");
    });
    const postal_code_obj = address_components.find((ac) => {
      return ac.types.includes("postal_code");
    });

    const full_adress = `${street_adress} ${
      city_obj ? city_obj.short_name : city_obj_2.short_name
    } ${state_obj ? state_obj.short_name : ""} ${
      postal_code_obj ? postal_code_obj.short_name : ""
    }`;

    update_adress_inputs(property_address_el, full_adress);

    const event = new Event("blur");
    property_address_el.dispatchEvent(event);

    await handle_auto_save_for_opportunity();
  });
}
