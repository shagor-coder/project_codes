import { appConfig } from "./app.config";
import { getElementByPromise } from "./get-element-by-promise";
import { handleAutoSave } from "./handle-auto-save";
import { updateInputValue } from "./update-input-value";

export const automCompleteSpan = document.createElement("span");

export const addAddressAutomComplete = async () => {
  const options = {
    componentRestrictions: { country: "us" },
    fields: ["geometry", "name"],
    strictBounds: false,
  };

  let inputFieldPromises = [];

  appConfig.customFieldsForAutocomplete.forEach((fieldName) => {
    inputFieldPromises.push(
      getElementByPromise(
        `.hl_contact-details-left input[placeholder="${fieldName}"]`
      )
    );
  });

  const inputFields = await Promise.all(inputFieldPromises);
  if (!inputFields.length) return;

  inputFields.forEach((inputField) => {
    const objectName = inputField.placeholder.trim();
    appConfig.autoCompleteInstance[objectName] =
      new google.maps.places.Autocomplete(inputField, options);
    appConfig.autoCompleteInstance[objectName].addListener(
      "place_changed",
      async () => {
        const { address_components, name } =
          appConfig.autoCompleteInstance[objectName].getPlace();

        console.log(name);

        if (objectName.includes("Preferences")) {
          const preferenceInput = document.querySelector(
            `.hl_contact-details-left textarea[placeholder="${appConfig.customFieldsForAutoSave[0]}"]`
          );
          if (!preferenceInput) return console.log("No preference");
          const newAddress = preferenceInput?.value
            ? preferenceInput?.value + ", " + name.trim().replace("County", "")
            : name.trim().replace("County", "");

          updateInputValue({ input: preferenceInput, value: newAddress });
          handleAutoSave();
        } else {
          const excludedInput = document.querySelector(
            `.hl_contact-details-left textarea[placeholder="${appConfig.customFieldsForAutoSave[1]}"]`
          );

          if (!excludedInput) return;

          const newAddress = excludedInput?.value
            ? excludedInput?.value + ", " + name.trim().replace("County", "")
            : name.trim().replace("County", "");

          updateInputValue({ input: excludedInput, value: newAddress });
          handleAutoSave();
        }

        updateInputValue({
          input: inputField,
          value: name.trim().replace("County", ""),
        });
        const event = new Event("blur");
        inputField.dispatchEvent(event);
      }
    );
  });
  const preferenceField = await getElementByPromise(
    '.hl_contact-details-left [id="contact.location_preferences_search"]'
  );

  if (!preferenceField) return;
  preferenceField.parentElement.appendChild(automCompleteSpan);
};
