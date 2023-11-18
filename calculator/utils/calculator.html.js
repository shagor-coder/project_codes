import { config } from "./calculator.config";
import { create_fields } from "./calculator.inputs";
import { handle_next_button } from "./calculator.nexthandler";

export let step_els = [];

export const next_button = document.createElement("button");
next_button.classList = `calculator_next_button`;
next_button.disabled = "disabled";
next_button.innerHTML = "Next Step";
next_button.addEventListener("click", handle_next_button);

export const generate_calculator_elements = (calculator) => {
  let step_index = 0;
  step_els = [];

  for (let step in config) {
    step_index++;
    const step_el = document.createElement("div");
    if (step_index !== 1) step_el.classList.add("hidden");
    step_el.dataset.index = step_index;
    const step_data = config[step];
    create_fields(step_data.fields, step_el);
    calculator.append(step_el);
    step_els.push(step_el);
  }
};
