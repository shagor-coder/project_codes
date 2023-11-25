import { calculator_data } from "./calculator.data";
import { next_button } from "./calculator.html";

let timeout_id;

export const handle_enable_disable_button = (step) => {
  clearTimeout(timeout_id);
  timeout_id = setTimeout(() => {
    const fields = calculator_data[step];
    const keys = Object.keys(fields);
    let completed = 0;
    for (let field in fields) {
      if (!fields[field]) return (next_button.disabled = "disabled");
      completed++;
      completed === keys.length ? (next_button.disabled = "") : null;
    }
  }, 500);
};
