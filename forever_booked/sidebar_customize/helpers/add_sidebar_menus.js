import { create_sidebar_menus } from "./create_sidebar_html";

export const add_sidebar_menus = async (mutation_observer) => {
  const created_menus = await create_sidebar_menus();
  const sidebar_nav = document.querySelector(".hl_nav-header > nav");
  created_menus.forEach((menu) => {
    sidebar_nav.appendChild(menu);
  });
};
