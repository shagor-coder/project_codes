import { google_api } from "./helpers/api_key";
import { handle_auto_complete } from "./helpers/handle_autocomplete";
const main = () => {
  const google_api_script = document.createElement("script");
  google_api_script.type = "text/javascript";
  google_api_script.src = google_api;
  document.querySelector("head").appendChild(google_api_script);

  google_api_script.addEventListener("load", () => {
    const adress_input = document.querySelector('[data-q="property_address"]');
    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry", "icon", "name"],
      types: ["address"],
    };
    const autocomplete = new google.maps.places.Autocomplete(
      adress_input,
      options
    );

    autocomplete.addListener(
      "place_changed",
      handle_auto_complete({
        adress_input: adress_input,
        auto_complete: autocomplete,
      })
    );
  });
};

window.addEventListener("hydrationDone", () => {
  main();
});
