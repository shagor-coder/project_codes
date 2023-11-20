import { calculator_data } from "./calculator.data";
import { handle_enable_disable_button } from "./calculator.enable.disable";

export const handle_input_events = (input) => {
  const input_block = input.parentElement;
  const main_parent = input_block.parentElement;

  const label_span = input.previousElementSibling.querySelector("span");

  const span_text_end =
    input.dataset.key === "your_avg_kw_consumtion" ? "kWH" : null;

  const span_text_start =
    input.dataset.key === "your_avg_monthly_bill" ? "$" : null;

  const is_range = input.type === "range";

  const step =
    main_parent.dataset.index === "1"
      ? "step_1"
      : main_parent.dataset.index === "2"
      ? "step_2"
      : "step_3";

  if (input.tagName === "INPUT") {
    input.addEventListener("input", () => {
      is_range
        ? (label_span.textContent = span_text_end
            ? `(${input.value}${span_text_end})`
            : `(${span_text_start}${input.value})`)
        : null;

      calculator_data[step][input.dataset.key.trim()] = is_range
        ? label_span.textContent.replaceAll("(", "").replaceAll(")", "")
        : input.value;
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
