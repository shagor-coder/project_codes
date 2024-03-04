import {
  add_call_script_btn,
  script_button,
} from "./helpers/add_call_script_btn";
import {
  add_rebuttal_button,
  rebuttal_button,
} from "./helpers/add_rebuttal_button";
import styles from "./style.css?inline=true";

let mutation_observer;
let current_path = "";
let remove_call_script_btn = false;

const stylesheet = document.createElement("style");
stylesheet.innerHTML = styles;
document.head.appendChild(stylesheet);

const initiate_observer = async () => {
  let current_url = new URL(location.href);
  current_path = current_url.pathname.trim();

  if (!current_path.toString().includes("location"))
    return console.log("Agency View");

  if (current_path.toString().includes("/workflow/"))
    return (remove_call_script_btn = true);

  if (current_path.toString().includes("/form-builder-v2/"))
    return (remove_call_script_btn = true);

  if (current_path.toString().includes("/survey-builder-v2/"))
    return (remove_call_script_btn = true);

  if (current_path.toString().includes("/page-builder/"))
    return (remove_call_script_btn = true);

  if (current_path.toString().includes("/emails/create/"))
    return (remove_call_script_btn = true);

  if (current_path.toString().includes("/campaigns/create"))
    return (remove_call_script_btn = true);

  let paths = current_path.split("/");
  let current_location_id = paths[3];

  if (current_location_id !== "FXF6jjAr2psAbWqibDRR")
    return rebuttal_button.remove(), script_button.remove();

  if (rebuttal_button.isConnected && script_button.isConnected) return;

  add_call_script_btn(mutation_observer);
  add_rebuttal_button(mutation_observer);
};

const run_mutation_observer = () => {
  const app = document.querySelector("#app");

  mutation_observer = new MutationObserver(initiate_observer);

  mutation_observer.observe(app, {
    subtree: true,
    childList: true,
    attributes: true,
  });
};

run_mutation_observer();
