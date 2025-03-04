import { getElementByPromise } from "./get-element-by-promise";

export const handleAutoSave = async () => {
  const saveButton = await getElementByPromise(
    ".form-footer.save button.bg-apple-500"
  );
  if (!saveButton) return;
  saveButton.click();
};
