import select_element_by_promise from "./selec_element_by_promise";

async function handle_auto_save() {
  const save_button = await select_element_by_promise(
    "#record-details-lhs .sticky.bottom-0 button.hr-button.hr-button--default-type.hr-button--medium-type.hr-button--primary.hr-button--2xs"
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
