import {
  call_script_categories,
  create_category_buttons,
} from "./create_category_buttons";

export const script_button = document.createElement("button");
script_button.innerHTML =
  "<span class='font-base'><i class='fas fa-file-alt'></i></span>";
script_button.classList = `
 btn btn-circle d-flex justify-content-center align-items-center btn-green-dark w-8 h-8
`;

script_button.addEventListener("click", () => {
  call_script_categories.classList.toggle("hidden");
});

export const add_call_script_btn = async () => {
  if (script_button.isConnected) return;

  const topbar_nav = document.querySelector(".hl_header--controls");
  if (!topbar_nav) return console.log("No topbar nav");
  topbar_nav.prepend(script_button);
  create_category_buttons();
};
