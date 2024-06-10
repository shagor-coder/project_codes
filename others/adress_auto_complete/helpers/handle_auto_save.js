import { get_element_by_promise } from "./get_element_by_promise";

export const handle_auto_save = async () => {
  const footer_save_btn = await get_element_by_promise(
    ".form-footer.save.absolute .hl-btn.bg-apple-500"
  );
  footer_save_btn ? footer_save_btn.click() : null;
};
