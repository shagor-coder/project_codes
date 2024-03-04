import { createCustomDropdown } from "./createMenusHtml";
import { getMenusFromSheet } from "./getMenusFromSheet";
import { returnDomElementByPromise } from "./returnDomElementByPromise";

export async function handleMenuInsert() {
  if (window.menuInserted) return console.log("Menu Inserted!!");

  if (window.customMenus && !window.menuInserted) {
    const automation = await returnDomElementByPromise("#sb_automation");
    if (!automation) return console.log("No automation found!!");
    const customDropdowns = createCustomDropdown(customMenus);
    customDropdowns?.forEach((customDropdownCon) => {
      automation.parentElement.insertBefore(customDropdownCon, automation);
    });
    window.menuInserted = true;
    console.log("From Menu Insert 2");
  } else {
    const customMenus = await getMenusFromSheet(
      "https://script.google.com/macros/s/AKfycbyi2Q0fIQVJgoGuiRmYINduGdx3eFMW0pI62ZkmE01GkcXvVbHjYMsCnBV3nphjzKti5g/exec?sheet=3"
    );

    const automation = await returnDomElementByPromise("#sb_automation");
    if (!automation) return console.log("No automation found!!");

    const customDropdowns = createCustomDropdown(customMenus);

    customDropdowns?.forEach((customDropdownCon) => {
      automation.parentElement.insertBefore(customDropdownCon, automation);
    });
    window.customMenus = customMenus;
    window.menuInserted = true;
    console.log("From menu insert 3");
  }
}
