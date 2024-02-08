import { get_element_by_promise } from "./get_element_by_promise";
import { menu_categories } from "./menu_categories";

export const create_sidebar_menus = async () => {
  let sidebar_menus =
    (await get_element_by_promise(".hl_nav-header a", "multi")) || [];

  let organised_menus = [];

  menu_categories.forEach((m) => {
    if (m.element !== "Custom" && m.element !== "Divider") {
      let menu_el = sidebar_menus?.find(
        (sm) =>
          sm.innerText.toString().trim().toLowerCase() ===
          m.element.trim().toLowerCase()
      );
      if (!menu_el && m.element !== "Custom")
        return console.log("No menus found");

      let text_content = menu_el.querySelector(".hl_text-overflow");
      text_content && (text_content.innerText = m.name);
      menu_el.dataset.order = m.order;
      organised_menus.push(menu_el);
    }

    if (m.element === "Divider") {
      let divider_el = document.createElement("a");
      divider_el.classList = `w-full group px-3 flex items-center justify-start sm:justify-center md:justify-center lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer exact-active-class active text-gray-300 font-normal cursor-text divider`;
      divider_el.innerHTML = `
      <p class="w-full text-left border-b border-solid my-3" style="line-height: 0.1em; font-size: 10px;"></p>
      `;
      divider_el.dataset.order = m.order;
      organised_menus.push(divider_el);
    }

    if (m.element === "Custom" && m.element !== "Divider") {
      let c_element = document.createElement("div");
      c_element.classList = `
            w-full custom-item
            `;
      c_element.dataset.order = m.order;

      c_element.innerHTML = `
              <div class="w-full group px-3 flex items-center justify-start md:justify-center lg:justify-start xl:justify-start text-sm rounded-md cursor-pointer custom-link font-medium opacity-70 hover:opacity-100 py-2 md:py-2 custom-text">
                <span class="md:mr-0 h-5 w-5 mr-2 lg:mr-2 xl:mr-2 font-sm">
                ${m.icon}
                </span>
                <span class="hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block"> ${m.name.trim()} </span>
              </div>
              <div class="custom-dropdown"></div>
            `;

      let dropdown = c_element.querySelector(".custom-dropdown");

      m.submenus?.forEach((em) => {
        let menu_el = sidebar_menus.find(
          (sm) => sm.innerText.toString().trim() === em.element.trim()
        );
        if (!menu_el) return console.log("No menu element found");

        let text_content = menu_el.querySelector(".hl_text-overflow");
        text_content && (text_content.innerText = em.name);
        dropdown.append(menu_el);
      });

      organised_menus.push(c_element);
    }
  });

  return organised_menus;
};
