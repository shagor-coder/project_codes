import { config } from "./calculator.config";
import { create_fields } from "./calculator.inputs";
import { handle_next_button } from "./calculator.nexthandler";

export let step_els = [];

export const calculator = document.getElementById("calculator");
export const calculator_header = document.createElement("div");
calculator_header.classList = `calculator_header`;

calculator_header.innerHTML = `
   <ul class="calculator_header_tabs">
     <li class="active">
      <span>
        ${config.header.tabs[0].icon}
      </span>
      <span>
        ${config.header.tabs[0].name}
      </span>
     </li>
     <li>
      <span>
        ${config.header.tabs[1].icon}
      </span>
      <span>
        ${config.header.tabs[1].name}
      </span>
     </li>
     <li>
      <span>
        ${config.header.tabs[2].icon}
      </span>
      <span>
        ${config.header.tabs[2].name}
      </span>
     </li>
     <li>
      <span>
        ${config.header.tabs[3].icon}
      </span>
      <span>
        ${config.header.tabs[3].name}
      </span>
     </li>
   </ul>

   <div class="calculator_step_details">
      <p class="step_name">
        Step 1
      </p>
      <h4 class="step_details">
        Your Info
      </h4>
   </div>
`;

export const calculator_quotes = document.createElement("div");
calculator_quotes.dataset.index = "4";
calculator_quotes.innerHTML = `
  
`;

export const calculator_header_tabs = [
  ...calculator_header.querySelectorAll("li"),
];

export const step_name = calculator_header.querySelector(".step_name");
export const step_details = calculator_header.querySelector(".step_details");

export const next_button = document.createElement("button");
next_button.classList = `calculator_next_button`;
next_button.disabled = "disabled";
next_button.innerHTML = "Next Step";
next_button.addEventListener("click", handle_next_button);

export const generate_calculator_elements = (calculator) => {
  let step_index = 0;
  step_els = [];

  for (let step in config.steps) {
    step_index++;
    const step_el = document.createElement("div");
    if (step_index !== 1) step_el.classList.add("hidden");
    step_el.dataset.index = step_index;
    const step_data = config.steps[step];
    create_fields(step_data.fields, step_el);
    calculator.append(step_el);
    step_els.push(step_el);
  }
};
