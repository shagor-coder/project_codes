import { staticData } from "./configuration";
import { getElementsByPromise } from "./get-elements-by-promise";

export const hideCustomFieldsContainer = async (contactTags = []) => {
  try {
    const collapseContainers = await getElementsByPromise(
      ".hl_contact-details-left .overflow-y-auto .border-b",
      true
    );
    if (!collapseContainers || !collapseContainers.length) {
      return console.error(
        collapseContainers
          ? "Collapse Container Not Available!"
          : "No Collapse Containers Found!"
      );
    }

    const collapseTitles = collapseContainers
      .map((collapseCon) => collapseCon.querySelector(".font-medium"))
      .filter((collapseTitle) => collapseTitle !== undefined);

    const allMatchedFieldTitles = [
      ...contactTags
        .map((cT) => staticData[cT])
        .filter((mF) => mF !== undefined),
      ...staticData.COMMON_FIELDS,
    ].flat();

    collapseTitles.forEach((collapseTitle) => {
      const matchedFieldTitle = allMatchedFieldTitles.find(
        (matchedFieldTitle) =>
          collapseTitle.innerText.toString().trim().toUpperCase() ===
          matchedFieldTitle
      );
      const collapseParent = collapseTitle?.parentElement?.parentElement;
      collapseParent.style = matchedFieldTitle
        ? ``
        : `display: none !important`;
    });
  } catch (error) {
    console.error(error);
  }
};
