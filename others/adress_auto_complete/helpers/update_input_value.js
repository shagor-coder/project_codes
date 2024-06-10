export const update_input_value = (input, value) => {
  const input_event = new Event("input");
  input.value = value;
  input.dispatchEvent(input_event);
};
