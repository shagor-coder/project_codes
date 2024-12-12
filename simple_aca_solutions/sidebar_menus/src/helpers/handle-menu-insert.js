import {
  createCustomDropdown,
  customDropdownCon,
  dropdownMain,
} from "./creat-custom-dropdown";
import { getElementByPromise } from "./get-element-by-promise";
import { menusArray } from "./menus-array";

export const handleMenuInsert = async (pathname) => {
  const automation = await getElementByPromise("#sb_automation");
  if (!automation) return console.log("No automation found!!");
  automation.parentElement.insertBefore(customDropdownCon, automation);
  createCustomDropdown(menusArray);
  customDropdownCon.append(dropdownMain);
};
