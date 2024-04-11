import { get_sheet_menus } from "./get_sheet_menus";

export const hlmx_dropdown_main = document.createElement("div");
hlmx_dropdown_main.classList = "hlmx-dropdown_main";
hlmx_dropdown_main.innerHTML = `<p><span>Your resources</span><span><i class="fas fa-angle-down"></i></span></p>`;
const hlmx_dropdown_container = document.createElement("div");
hlmx_dropdown_container.classList = "hlmx-dropdown_container";

let menu_categories = [];

const get_buttons_data = async () => {
  try {
    if (window.sheet_data) return window.sheet_data;
    const sheet_data = await get_sheet_menus();
    window.sheet_data = sheet_data;
    return sheet_data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const create_dropdown_buttons = async () => {
  try {
    const sheet_data = await get_buttons_data();
    const menu_category = sheet_data?.map((sd) => sd.Menu_Category);

    const unique_categoris = [...new Set(menu_category)];

    menu_categories = [];
    hlmx_dropdown_container.innerHTML = "";

    unique_categoris?.forEach((cate) => {
      const hlmx_dropdown_item = document.createElement("div");
      hlmx_dropdown_item.classList = "hlmx-dropdown_item";
      hlmx_dropdown_item.innerHTML = `<span class="hlmx-dropdown_item_text">${cate.trim()}</span><div class="hlmx-dropdown_item_link"></div>`;
      hlmx_dropdown_item.dataset.category = cate.trim();
      menu_categories.push(hlmx_dropdown_item);
    });

    sheet_data.forEach((sd) => {
      if (!sd.Menu_Link) return console.log("No link provided!");
      const hlmx_dropdown_link = document.createElement("a");
      hlmx_dropdown_link.classList = "hlmx-dropdown_link";
      hlmx_dropdown_link.innerHTML = sd.Menu_Name;
      hlmx_dropdown_link.href = sd.Menu_Link;
      hlmx_dropdown_link.target = "_blank";
      const selecetd_category = menu_categories.find(
        (mc) => mc.dataset.category === sd.Menu_Category
      );
      selecetd_category &&
        selecetd_category
          .querySelector(".hlmx-dropdown_item_link")
          .appendChild(hlmx_dropdown_link);
    });

    menu_categories.forEach((mc) => {
      if (mc.querySelector(".hlmx-dropdown_item_link").hasChildNodes())
        hlmx_dropdown_container.appendChild(mc);
    });

    hlmx_dropdown_main.append(hlmx_dropdown_container);
  } catch (error) {
    throw new Error(error.message);
  }
};
