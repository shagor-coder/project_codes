import {
  add_call_script_btn,
  script_button,
} from "./helpers/add_call_script_btn";
import {
  add_rebuttal_button,
  rebuttal_button,
} from "./helpers/add_rebuttal_button";
import { location_info } from "./helpers/location_info";
import styles from "./style.css?inline=true";

const stylesheet = document.createElement("style");
stylesheet.innerHTML = styles;
document.head.appendChild(stylesheet);

const initiate_observer = (timeout) => {
  let timeout_id = null;
  return () => {
    clearTimeout(timeout_id);
    if (rebuttal_button.isConnected && script_button.isConnected) return;
    timeout_id = setTimeout(() => {
      let current_url = new URL(location.href);
      let current_path = current_url.pathname.trim();
      if (!current_path.toString().includes("location")) return;

      location_info.location_id = current_path.split("/")[3];

      if (location_info.old_location_id !== location_info.location_id)
        return (
          rebuttal_button.remove(),
          script_button.remove(),
          (location_info.old_location_id = location_info.location_id)
        );
      add_call_script_btn();
      add_rebuttal_button();
    }, timeout);
  };
};

const mutation_observer = new MutationObserver(initiate_observer(200));

const run_mutation_observer = () => {
  const app = document.querySelector("#app");
  mutation_observer.observe(app, {
    subtree: true,
    childList: true,
    attributes: true,
  });
};

run_mutation_observer();
