import { create_sidebar_menus } from "./create_sidebar_html";

export const add_sidebar_menus = async (mutation_observer) => {
  const organised_menus = await create_sidebar_menus();
  console.log(organised_menus);

  const sidebar_nav = document.querySelector(".hl_nav-header > nav");

  organised_menus.forEach((menu) => {
    sidebar_nav.appendChild(menu);
  });
};
