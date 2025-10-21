import handle_auto_save, {
  handle_auto_save_for_opportunity,
} from "./handle_auto_save";
import { google_input } from "./handle_map_icons_insert";
import update_adress_inputs from "./update_adress_input";

const mutation_observer = new MutationObserver(mutationCallBackFn(500));
let userInput = null;

function mutationCallBackFn(timeout) {
  let timeoutId = null;

  return (mutationList) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const isValueMutation = mutationList.find(
        (muL) => muL.attributeName === "value"
      );

      if (!isValueMutation) return console.log("Not Input Valuation!");

      userInput = isValueMutation.target;
      update_adress_inputs(google_input, isValueMutation?.target.value.trim());

      google_input.style = `display: block;`;

      google_input.focus();
    }, timeout);
  };
}

function initiate_auto_complete(input_el) {
  const autocomplete = new google.maps.places.Autocomplete(input_el, {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });

  return autocomplete;
}

export async function add_search_auto_complete_for_contacts(
  google_input,
  street_adress_con
) {
  // const { street_adress_input, city_input, state_input, postal_code_input } =
  //   adress_inputs;

  const autocomplete = initiate_auto_complete(google_input);

  mutation_observer.observe(street_adress_con, {
    attributes: true,
    childList: true,
    subtree: true,
  });

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

    // Change Address Format Here For Contact Field

    const full_adress = `${street_adress}, ${
      city_obj ? city_obj.short_name : city_obj_2.short_name
    }, ${state_obj ? state_obj.short_name : ""}, ${
      postal_code_obj ? postal_code_obj.short_name : ""
    }`;

    update_adress_inputs(google_input, full_adress);
    update_adress_inputs(userInput, full_adress);

    const event = new Event("blur");
    google_input.dispatchEvent(event);

    google_input.style = `display: none;`;

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

    // Change Address Format Here For Opportunity Field

    const full_adress = `${street_adress}, ${
      city_obj ? city_obj.short_name : city_obj_2.short_name
    }, ${state_obj ? state_obj.short_name : ""}, ${
      postal_code_obj ? postal_code_obj.short_name : ""
    }`;

    update_adress_inputs(property_address_el, full_adress);

    const event = new Event("blur");
    property_address_el.dispatchEvent(event);

    await handle_auto_save_for_opportunity();
  });
}
