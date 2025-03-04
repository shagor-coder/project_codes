export const updateInputValue = ({ input, value }) => {
  const E = new Event("input");
  input.value = value;
  E.initEvent("input", true, true);
  input.dispatchEvent(E);
};
