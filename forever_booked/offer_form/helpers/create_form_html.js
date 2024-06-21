export const form_container = document.createElement("div");
form_container.className = "form_container";

form_container.innerHTML = `
  <div class="form_container">
        <div class="form_container_header">Please Choose Your Offer</div>
        <div class="form_container_body">
            <label for="offer_category">Offer Category:</label>
            <select id="offer_category" class="offer_category">
                <option value="">Please choose an option</option>
            </select>

            <label for="offer_name">Offer Name:</label>
            <select id="offer_name" class="offer_name">
                <option value="">Please choose an option</option>
            </select>

            <label for="offer_bonus">Offer Bonus:</label>
            <select id="offer_bonus" class="offer_bonus">
                <option value="">Please choose an option</option>
            </select>

            <label for="offer_upsell">Offer Upsell:</label>
            <select id="offer_upsell" class="offer_upsell">
                <option value="">Please choose an option</option>
            </select>

            <label for="offer_text">Offer Text:</label>
            <textarea id="offer_text" class="offer_text" content-editable="true"></textarea>
        </div>
        <div class="form_container_footer">
            <p class="form_container_text">Copyright © 2024 Forever Booked</p>
        </div>
    </div>
`;

export const form_container_body = form_container.querySelector(
  ".form_container_body"
);

const offer_select = form_container_body.querySelector(".offer_category");
const offer_name = form_container_body.querySelector(".offer_name");
const offer_bonus = form_container_body.querySelector(".offer_bonus");
const offer_upsell = form_container_body.querySelector(".offer_upsell");
const offer_text = form_container_body.querySelector(".offer_text");

const create_select_options = (data, c, index) => {
  const category_option = document.createElement("option");
  category_option.className = "select_option";
  category_option.value = c;
  category_option.innerHTML = c;
  category_option.form_data = data;
  category_option.dataset.index = index;
  return category_option;
};

const handle_offer_select = (e) => {
  offer_bonus.innerHTML = `<option value="">Please choose an option</option>`;
  offer_upsell.innerHTML = `<option value="">Please choose an option</option>`;
  offer_name.innerHTML = `<option value="">Please choose an option</option>`;
  offer_text.innerHTML = "";

  const selected_option = offer_select.options[e.target.selectedIndex];
  const category_index = selected_option.dataset.index;

  if (!category_index) return;

  const data = selected_option.form_data[Number(category_index)];

  data.forEach((d, index) => {
    const category_name_option = create_select_options(
      data,
      d.Offer_Name,
      index
    );
    offer_name.append(category_name_option);
  });
};

const handle_name_select = (e) => {
  offer_bonus.innerHTML = `<option value="">Please choose an option</option>`;
  offer_upsell.innerHTML = `<option value="">Please choose an option</option>`;
  offer_text.innerHTML = ``;

  const selected_option = offer_name.options[e.target.selectedIndex];
  const category_index = selected_option.dataset.index;

  if (!category_index) return;

  const data = selected_option.form_data;

  data.forEach((d, index) => {
    const category_name_option = create_select_options(
      data,
      d.Recommended_Bonuses,
      index
    );
    offer_bonus.append(category_name_option);
  });
};

const handle_bonus_select = (e) => {
  offer_upsell.innerHTML = `<option value="">Please choose an option</option>`;
  offer_text.innerHTML = ``;

  const selected_option = offer_name.options[e.target.selectedIndex];
  const category_index = selected_option.dataset.index;

  if (!category_index) return;

  const data = selected_option.form_data;

  data.forEach((d, index) => {
    const category_name_option = create_select_options(
      data,
      d.Recommended_Upsell_Package,
      index
    );
    offer_upsell.append(category_name_option);
  });
};

const handle_upsell_select = (e) => {
  offer_text.innerHTML = ``;

  const selected_option = offer_name.options[e.target.selectedIndex];
  const category_index = selected_option.dataset.index;

  if (!category_index) return;

  const data = selected_option.form_data[Number(category_index)];
  offer_text.textContent = data.Text_Preview;
};

offer_select.addEventListener("change", handle_offer_select);
offer_name.addEventListener("change", handle_name_select);
offer_bonus.addEventListener("change", handle_bonus_select);
offer_upsell.addEventListener("change", handle_upsell_select);

export const create_form_html = (data = [], categories = []) => {
  offer_select.innerHTML = `<option value="">Please choose an option</option>`;

  categories.forEach((c, index) => {
    const category_option = create_select_options(data, c, index);
    offer_select.append(category_option);
  });
};
