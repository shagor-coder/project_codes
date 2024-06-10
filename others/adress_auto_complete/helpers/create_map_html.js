import { get_element_by_promise } from "./get_element_by_promise";

export const map_element = document.createElement("div");
map_element.style = `
 position: absolute; right: 0; top: 0;
`;
map_element.innerHTML = `<p style="display: flex;align-items: center; justify-content: flex-end;gap: 8px">
<span style="font-size: 14px; font-weight: 500; color: #000; font-family: "Roboto",sans-serif;>Google Maps</span>
<span class="map_btn" style="max-width: 18px;cursor: pointer;"><img src="https://storage.googleapis.com/msgsndr/XuqRXK2aMJFTIGJOg9f6/media/6633a9e71cbf1e5bdc1ea71d.png" alt="google maps"/></span>
</p>`;
const map_btn = map_element.querySelector(".map_btn");

export const handle_map_append = (address_input) => {
  const main_input_parent =
    address_input.offsetParent.parentElement.parentElement;
  main_input_parent.style = "position: relative";
  main_input_parent.prepend(map_element);
};

map_btn.addEventListener("click", async () => {
  const current_address_input = await get_element_by_promise(
    '[name="contact.appt_opportunity_address"]',
    false
  );
  const total_address = current_address_input.value
    ? current_address_input.value
    : "";

  const splitted_address = total_address.split(",") || [];

  const search_address = splitted_address.slice(0, splitted_address.length - 1);

  const link = "https://google.com/maps/search/" + search_address;
  window.open(link, "_blank");
});
