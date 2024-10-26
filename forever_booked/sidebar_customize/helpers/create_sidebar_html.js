import { get_element_by_promise } from "./get_element_by_promise";
import { menu_categories } from "./menu_categories";

export let organised_menus = [];
export let custom_menus = [];
export let custom_elements = [];

const wait = (timeout) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(true);
    }, timeout)
  );

export const create_sidebar_menus = async () => {
  organised_menus = [];
  custom_menus = [];

  // await wait(1500);

  let sidebar_menus =
    (await get_element_by_promise(".hl_nav-header a", "multi")) || [];

  custom_elements?.forEach((ce) => {
    ce.remove();
  });

  custom_elements = [];

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
      text_content && (menu_el.dataset.text = text_content.innerText);
      text_content && (text_content.innerText = m.name);

      let icon_con = document.createElement("span");
      icon_con.classList = "custom-icon";
      icon_con.innerHTML = m.icon;
      menu_el.prepend(icon_con);
      custom_elements.push(icon_con);
      menu_el.dataset.order = m.order;
      organised_menus.push(menu_el);
    }

    if (m.element === "Divider") {
      let divider_el = document.createElement("a");
      divider_el.classList = `w-full group px-3 flex items-center justify-start sm:justify-center md:justify-center lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer exact-active-class active text-gray-300 font-normal cursor-text divider custom-divider`;
      divider_el.innerHTML = `
      <p class="w-full text-left border-b border-solid my-3" style="line-height: 0.1em; font-size: 10px;"></p>
      `;
      divider_el.dataset.order = m.order;
      organised_menus.push(divider_el);

      custom_elements.push(divider_el);
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
                <span class="ml-auto font-sm right-icon">
                  <i class="fa-solid fa-angle-right"></i>
                </span>
              </div>
              <div class="custom-dropdown"></div>
            `;

      let dropdown = c_element.querySelector(".custom-dropdown");
      let custom_text = c_element.querySelector(".custom-text");

      m.submenus?.forEach((em) => {
        let menu_el = sidebar_menus.find(
          (sm) => sm.innerText.toString().trim() === em.element.trim()
        );
        if (!menu_el) return console.log("No menu element found");

        let text_content = menu_el.querySelector(".hl_text-overflow");
        text_content && (menu_el.dataset.text = text_content.innerText);
        text_content && (text_content.innerText = em.name);
        let icon_con = document.createElement("span");
        icon_con.classList = "custom-icon";
        icon_con.innerHTML = em.icon;
        menu_el.prepend(icon_con);
        custom_elements.push(icon_con);

        dropdown.append(menu_el);
      });

      organised_menus.push(c_element);
      custom_menus.push(c_element);
      custom_elements.push(c_element);

      custom_text.addEventListener("click", (e) => {
        e.stopPropagation();

        custom_menus.forEach((m) => {
          let is_current_menu = m === c_element;

          is_current_menu ? null : m.classList.remove("active");
        });
        let is_active = c_element.classList.contains("active");
        is_active
          ? c_element.classList.remove("active")
          : c_element.classList.add("active");
      });
    }
  });

  return organised_menus;
};
