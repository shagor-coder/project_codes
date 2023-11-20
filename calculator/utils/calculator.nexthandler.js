import { append_cost_estimates } from "./calculator.append.estimate";
import { config } from "./calculator.config";
import {
  calculator_header_tabs,
  next_button,
  step_details,
  step_els,
  step_name,
} from "./calculator.html";

export let active_step = 0;

export const handle_next_button = () => {
  active_step++;

  step_els.forEach((step_el) => {
    step_el.classList.add("hidden");
  });

  calculator_header_tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  calculator_header_tabs.slice(0, active_step + 1).forEach((tab) => {
    tab.classList.add("gradient");
  });

  calculator_header_tabs[active_step].classList.add("active");

  step_els[active_step].classList.remove("hidden");
  step_name.textContent = `Step ${active_step + 1}`;
  const step_key = `step_${active_step + 1}`;
  step_details.textContent = config.steps[step_key].name;
  //next_button.disabled = "disabled";

  if (active_step === step_els.length - 1)
    append_cost_estimates(step_els[active_step], 0.35), next_button.remove();
};
