export const form_container = document.createElement("div");
form_container.className = "form_container";

form_container.innerHTML = `
  <div class="form_container">
        <div class="form_container_header">Please Choose Your Offer</div>
        <div class="form_container_body">
          <form class="booster_shot_form">
            <label for="business_name">Business Name</label>
            <input type="text" id="business_name" class="business_name"  required/>

            <label for="launch_date">Launch Date</label>
            <input type="text" id="launch_date" class="launch_date" required/>

            <label for="offer_category">Offer Category:</label>
            <select id="offer_category" class="offer_category" required>
                <option value="">Please choose an option</option>
            </select>

            <label for="offer_name">Offer Name:</label>
            <select id="offer_name" class="offer_name" required>
                <option value="">Please choose an option</option>
            </select>

            <label for="offer_explaination">Explaination:</label>
            <textarea id="offer_explaination" class="offer_explaination" disabled required></textarea>

            <label for="text_preview">Text Preview:</label>
            <textarea id="text_preview" class="text_preview" content-editable="true" required></textarea>

            <button id="submit" type="submit" class="form_button">Submit</button>
          </form>
        </div>
        <div class="form_container_footer">
            <p class="form_container_text">Copyright © 2024 Forever Booked</p>
        </div>
    </div>
`;

export const form_container_body = form_container.querySelector(
  ".form_container_body"
);

const business_name = form_container.querySelector(".business_name");
const launch_date = form_container.querySelector(".launch_date");
const offer_category = form_container_body.querySelector(".offer_category");
const offer_name = form_container_body.querySelector(".offer_name");
const offer_explaination = form_container_body.querySelector(
  ".offer_explaination"
);
const text_preview = form_container_body.querySelector(".text_preview");
const booster_shot_form =
  form_container_body.querySelector(".booster_shot_form");

booster_shot_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const request_options = {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business_name: business_name.value,
        launch_date: launch_date.value,
        offer_category: offer_category.value,
        offer_name: offer_name.value,
        offer_explaination: offer_explaination.value,
        text_preview: text_preview.value,
      }),
    };

    const request = await fetch(
      "https://backend.leadconnectorhq.com/hooks/3ph7NZx2kybPjT6R8uJc/webhook-trigger/9a852a76-3172-4b61-98da-640a200a508e",
      request_options
    );
    const response = await request.json();
    if (response.status === 200)
      window.open("{{ custom_values.booster_shot_redirect_url }}", "_self");
  } catch (error) {
    throw new Error(error);
  }
});

const create_select_options = (data, c, index) => {
  const category_option = document.createElement("option");
  category_option.className = "select_option";
  category_option.value = c;
  category_option.innerHTML = c;
  category_option.form_data = data;
  category_option.dataset.index = index;
  return category_option;
};

const handle_offer_category = (e) => {
  offer_name.innerHTML = `<option value="">Please choose an option</option>`;
  text_preview.innerHTML = "";

  const selected_option = offer_category.options[e.target.selectedIndex];
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
  text_preview.innerHTML = ``;

  const selected_option = offer_name.options[e.target.selectedIndex];
  const category_index = selected_option.dataset.index;

  if (!category_index) return;

  const data = selected_option.form_data[Number(category_index)];

  offer_explaination.innerHTML = data.Explanation;
  text_preview.innerHTML = data.Text_Preview;
};

offer_category.addEventListener("change", handle_offer_category);
offer_name.addEventListener("change", handle_name_select);

export const create_form_html = (data = [], categories = []) => {
  offer_category.innerHTML = `<option value="">Please choose an option</option>`;

  categories.forEach((c, index) => {
    const category_option = create_select_options(data, c, index);
    offer_category.append(category_option);
  });
};
