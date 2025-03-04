import {
  create_rebuttal_buttons,
  rebuttal_categories,
} from "./create_rebuttal_buttons";

export const rebuttal_button = document.createElement("button");
rebuttal_button.innerHTML = "<span class='font-base'>Rebuttal</span>";
rebuttal_button.classList = `
 _rebuttal_button 
`;

rebuttal_button.addEventListener("click", () => {
  rebuttal_categories.classList.toggle("hidden");
});

export const add_rebuttal_button = async () => {
  if (rebuttal_button.isConnected) return;

  const topbar_nav = document.querySelector(".hl_header .container-fluid");
  if (!topbar_nav) return console.log("No topbar nav");
  topbar_nav.prepend(rebuttal_button);
  await create_rebuttal_buttons();
};
