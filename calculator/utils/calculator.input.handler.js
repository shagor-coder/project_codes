import { calculator_data } from "./calculator.data";
import { handle_enable_disable_button } from "./calculator.enable.disable";

export const handle_input_events = (input) => {
  const parent_element = input.parentElement.parentElement;

  const step =
    parent_element.dataset.index === "1"
      ? "step_1"
      : parent_element.dataset.index === "2"
      ? "step_2"
      : "step_3";

  if (input.tagName === "INPUT") {
    input.addEventListener("input", () => {
      calculator_data[step][input.dataset.key.trim()] = input.value;
      handle_enable_disable_button(step);
    });
  }

  if (input.tagName === "SELECT") {
    input.addEventListener("change", () => {
      calculator_data[step][input.dataset.key.trim()] = input.value;
      handle_enable_disable_button(step);
    });
  }
};
