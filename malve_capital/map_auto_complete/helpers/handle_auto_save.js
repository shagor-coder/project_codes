import select_element_by_promise from "./selec_element_by_promise";

async function handle_auto_save() {
  const save_button = await select_element_by_promise(
    ".form-footer.save button.bg-apple-500"
  );
  if (!save_button) return;

  save_button.click();
}
export async function handle_auto_save_for_opportunity() {
  const save_button = await select_element_by_promise(
    "#CreateUpdateOpportunity"
  );
  if (!save_button) return;
  save_button.click();
}

export default handle_auto_save;
