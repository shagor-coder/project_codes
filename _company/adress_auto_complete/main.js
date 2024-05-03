import { map_element } from "./helpers/create_map_html";
import { handle_auto_complete } from "./helpers/handle_auto_complete";

const observer_options = {
  attributes: true,
  childList: true,
  subtree: true,
};

const mutation_calllback = (timeout) => {
  let timeout_id = null;
  return () => {
    if (map_element.isConnected) return;
    clearTimeout(timeout_id);
    timeout_id = setTimeout(() => {
      let current_location_url = new URL(location.href);
      let { pathname } = current_location_url;
      if (!pathname.includes("/contacts/detail/")) return;
      handle_auto_complete();
    }, timeout);
  };
};

const mutation_observer = new MutationObserver(mutation_calllback(500));

const main = () => {
  const app = document.querySelector("#app");
  mutation_observer.observe(app, observer_options);
};

main();
