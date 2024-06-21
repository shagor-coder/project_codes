import { create_form_html, form_container } from "./helpers/create_form_html";
import { format_offer_data } from "./helpers/format_offer_data";
import { get_offer_data } from "./helpers/get_offer_data";

const main = async () => {
  const app = document.getElementById("app");
  const data = await get_offer_data();
  const { offer_names, offer_categories_array } = format_offer_data(data);

  create_form_html(offer_names, offer_categories_array);

  app.appendChild(form_container);
};

main();
