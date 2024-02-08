import { select_dom_element } from "./select_dom_element";

export const center_radio_label = async () => {
  const all_input_containers = await select_dom_element(
    ".form-builder--item",
    "multi"
  );
  if (!all_input_containers.length) return console.log("No input containers");

  all_input_containers.forEach((input_container) => {
    const radio_inputs = input_container.querySelectorAll("input[type=radio]");
    if (radio_inputs.length)
      input_container.classList.add("radio_label_container");
  });
};
