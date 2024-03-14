import { add_sidebar_menus } from "./helpers/add_sidebar_menus";
import { exclude_accounts } from "./helpers/menu_categories";
import styles from "./style.css?inline=true";

let mutation_observer;
let current_path;
let old_location_id;
let settings_visited = false;

const stylesheet = document.createElement("style");
stylesheet.innerHTML = styles;

const initiate_observer = async () => {
  let current_url = new URL(location.href);
  current_path = current_url.pathname.trim();

  if (!current_path.toString().includes("location"))
    return console.log("Agency View"), (old_location_id = "");

  if (current_path.toString().includes("/settings/"))
    return (settings_visited = true);

  let paths = current_path.split("/");

  if (current_path.toString().includes("/workflow/"))
    return (settings_visited = true);

  if (current_path.toString().includes("/form-builder-v2/"))
    return (settings_visited = true);

  if (current_path.toString().includes("/survey-builder-v2/"))
    return (settings_visited = true);

  if (current_path.toString().includes("/page-builder/"))
    return (settings_visited = true);

  if (current_path.toString().includes("/emails/create/"))
    return (settings_visited = true);

  if (current_path.toString().includes("/campaigns/create/"))
    return (settings_visited = true);

  if (current_path.toString().includes("/customers/detail/"))
    return (settings_visited = true);

  let current_location_id = paths[3];

  if (
    old_location_id &&
    exclude_accounts.includes(current_location_id.trim()) &&
    old_location_id !== current_location_id
  )
    return (
      stylesheet.remove(),
      (location.pathname = `/v2/location/${current_location_id}/settings/company`)
    );

  if (exclude_accounts.includes(current_location_id.trim()))
    return stylesheet.remove();

  if (old_location_id === current_location_id && !settings_visited) return;

  if (old_location_id && old_location_id !== current_location_id)
    return (location.pathname = `/v2/location/${current_location_id}/settings/company`);

  old_location_id = current_location_id;

  settings_visited = false;
  document.head.appendChild(stylesheet);

  await add_sidebar_menus(mutation_observer);
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
