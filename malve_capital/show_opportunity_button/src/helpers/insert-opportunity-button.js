import { opportunityButton } from "./create-button";
import { getElementsByPromise } from "./get-element-by-promise";

export const insertOportunityButton = async () => {
  try {
    const contactFilter = await getElementsByPromise(
      "#activityDropdownMenuButton",
      false
    );
    if (!contactFilter) return console.log("No contact filter found!");
    contactFilter.parentElement.style = `display:flex !important;`;
    contactFilter.parentElement.insertBefore(opportunityButton, contactFilter);
  } catch (error) {
    console.error(error);
  }
};
