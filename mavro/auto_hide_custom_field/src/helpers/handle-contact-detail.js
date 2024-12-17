import { getElementsByPromise } from "./get-elements-by-promise";
import { hideCustomFieldsContainer } from "./hide-custom-fields-container";

export const handleContactDetails = async () => {
  try {
    const tagElements = await getElementsByPromise(
      ".hl_contact-details-left .tag",
      true
    );

    if (!tagElements) return console.error("No tags found!");
    if (!tagElements.length) return console.log("No tags available!");

    const tags = tagElements.map((tagE) =>
      tagE.innerText.toString().trim().replace(" ", "_").toUpperCase()
    );
    await hideCustomFieldsContainer(tags);
  } catch (error) {
    console.error(error);
  }
};
