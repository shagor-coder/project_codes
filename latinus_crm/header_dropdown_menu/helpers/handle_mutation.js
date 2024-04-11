import {
  create_dropdown_buttons,
  hlmx_dropdown_main,
} from "./create_dropdown_button";
import { get_element_by_promis } from "./get_element_by_promise";

export const handle_mutation = async () => {
  const current_active_url = new URL(location.href);
  const { pathname } = current_active_url;

  if (!pathname.includes("location"))
    return hlmx_dropdown_main.remove(), console.log("agency account");

  if (hlmx_dropdown_main.isConnected) return console.log("Already added");
  const ghl_header = await get_element_by_promis({
    selector: ".hl_header > .container-fluid",
    multiple: false,
  });

  if (!ghl_header)
    return console.log("No header found!"), mutationObsever.disconnect();

  ghl_header.prepend(hlmx_dropdown_main);
  create_dropdown_buttons();
};
