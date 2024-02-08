import { add_sidebar_menus } from "./helpers/add_sidebar_menus";
import "./style.css";

let mutation_observer;
let current_path;
let old_location_id;

const initiate_observer = () => {
  let current_url = new URL(location.href);
  current_path = current_url.pathname.trim();

  if (!current_path.toString().includes("location"))
    return console.log("Agency View");
  let paths = current_path.split("/");

  let current_location_id = paths[3];

  if (old_location_id === current_location_id)
    return console.log("Same Location");

  old_location_id = current_location_id;

  add_sidebar_menus(mutation_observer);
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
