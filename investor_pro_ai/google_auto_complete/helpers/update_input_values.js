export const update_input_values = ({ input, value }) => {
  const input_event = new Event("input", { bubbles: true, cancelable: true });
  input.value = value ? value : "";
  input.dispatchEvent(input_event);
};
