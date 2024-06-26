export const form_container = document.createElement("div");
form_container.className = "form_container";

form_container.innerHTML = `
  <div class="form_container">
        <div class="form_container_body">
          <form class="booster_shot_form">

            <label style="margin-bottom: 16px;" for="offer_category">Browse Offers</label>
            
            <select id="offer_category" class="offer_category">
                <option value="">1. Select Category</option>
             </select>
             <select id="offer_name" class="offer_name">
                <option value="">2. Select Offer</option>
             </select>

            <p style="display:none;" class="resource_docs"></p> 

            <label for="offer_explaination">Offer Details</label>
            <textarea id="offer_explaination" class="offer_explaination" disabled></textarea>

            <label for="text_preview">Text Message</label>
            <textarea id="text_preview" class="text_preview" content-editable="true" required></textarea>

            <input type="text" id="business_name" class="business_name" placeholder="Input your business name here…"  required/>

            <input type="text" id="launch_date" class="launch_date" placeholder="Input requested launch date here…" required/>

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
const resource_docs = form_container_body.querySelector(".resource_docs");
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
  offer_name.innerHTML = `<option value="">2. Select Offer</option>`;
  resource_docs.innerHTML = "";
  resource_docs.style.display = "none";
  text_preview.innerHTML = "";
  offer_explaination.innerHTML = "";

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
  resource_docs.innerHTML = "";
  resource_docs.style.display = "none";
  text_preview.innerHTML = ``;
  offer_explaination.innerHTML = "";

  const selected_option = offer_name.options[e.target.selectedIndex];
  const category_index = selected_option.dataset.index;

  if (!category_index) return;

  const data = selected_option.form_data[Number(category_index)];

  const doc_link = data.Resource_Document ? data.Resource_Document : null;

  if (doc_link)
    (resource_docs.innerHTML = `<a class="resource_link" href=${doc_link} target="_blank">Resource Document</a>`),
      (resource_docs.style.display = "block");

  offer_explaination.innerHTML = data.Explanation;
  text_preview.innerHTML = data.Text_Preview;
};

offer_category.addEventListener("change", handle_offer_category);
offer_name.addEventListener("change", handle_name_select);

export const create_form_html = (data = [], categories = []) => {
  offer_category.innerHTML = `<option value="">1. Select Category</option>`;

  categories.forEach((c, index) => {
    const category_option = create_select_options(data, c, index);
    offer_category.append(category_option);
  });
};
