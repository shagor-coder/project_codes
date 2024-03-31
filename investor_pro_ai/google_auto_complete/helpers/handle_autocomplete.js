import { update_input_values } from "./update_input_values";

export const handle_auto_complete = ({ adress_input, auto_complete }) => {
  return async () => {
    const { address_components, name } = auto_complete.getPlace() || [];

    const city_input = document.getElementById("city");
    const state_input = document.getElementById("state");
    const postal_code = document.getElementById("postal_code");

    const city_obj = address_components.find(
      (component) =>
        component.types.includes("locality") &&
        component.types.includes("political")
    );
    const state_obj = address_components.find((component) =>
      component.types.includes("administrative_area_level_1")
    );
    const postal_obj = address_components.find((component) =>
      component.types.includes("postal_code")
    );

    update_input_values({ input: adress_input, value: name });
    update_input_values({ input: state_input, value: state_obj?.short_name });
    update_input_values({ input: city_input, value: city_obj?.short_name });
    update_input_values({
      input: postal_code,
      value: postal_obj?.short_name,
    });

    const event = new Event("blur");
    adress_input.dispatchEvent(event);
  };
};
