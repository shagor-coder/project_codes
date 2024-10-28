import { google_maps_icons_container } from "./helpers/create_html";
import {
  handle_maps_icons_insert_for_contact,
  handle_opportunity_card_click,
} from "./helpers/handle_map_icons_insert";
import styles from "./style.css?inline=true";

const style_tag = document.createElement("style");
style_tag.type = "text/css";
style_tag.innerHTML = styles;

document.head.appendChild(style_tag);

function watch_document_change() {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const current_url = new URL(location.href);
      if (!current_url.pathname.includes("location")) return;
      if (google_maps_icons_container.isConnected) return;
      if (current_url.pathname.includes("/contacts/detail/")) {
        await handle_maps_icons_insert_for_contact(current_url.pathname);
        return;
      }
      if (current_url.pathname.includes("/opportunities/list")) {
        await handle_opportunity_card_click();
        return;
      }
    }, 500);
  };
}

const mutation_observer = new MutationObserver(watch_document_change());

async function main() {
  const main_wrapper = document.querySelector("#app");
  if (!main_wrapper) return;
  mutation_observer.observe(main_wrapper, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

main();
