export const form_container = document.createElement("div");
form_container.className = "form_container";

form_container.innerHTML = `
  <div class="form_container">
        <div class="form_container_body">
          <form class="ishiguro_offer_form">

            <label style="margin-bottom: 16px;" for="offer_category">Browse Offers</label>
            
            <select id="offer_category" class="offer_category">
                <option value="">1. Select Category</option>
             </select>
             <select id="offer_name" class="offer_name">
                <option value="">2. Select Offer</option>
             </select>

            <label for="recommended_tracking_name">Recommended Tracking Name</label>
            <input id="recommended_tracking_name" class="recommended_tracking_name" type="text"></input>

            <label for="recommended_ai_statement">Recommended AI Statement</label>
            <textarea id="recommended_ai_statement" class="recommended_ai_statement" content-editable="true"></textarea>

            <input type="text" id="business_name" class="business_name" placeholder="Input your business name here…"  required/>
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
const offer_category = form_container_body.querySelector(".offer_category");
const offer_name = form_container_body.querySelector(".offer_name");
const recommended_tracking_name = form_container_body.querySelector(
  ".recommended_tracking_name"
);
const recommended_ai_statement = form_container_body.querySelector(
  ".recommended_ai_statement"
);
const ishiguro_offer_form = form_container_body.querySelector(
  ".ishiguro_offer_form"
);

ishiguro_offer_form.addEventListener("submit", async (e) => {
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
        offer_category: offer_category.value,
        offer_name: offer_name.value,
        recommended_tracking_name: recommended_tracking_name.value,
        recommended_ai_statement: recommended_ai_statement.value,
      }),
    };

    const request = await fetch(
      "https://services.leadconnectorhq.com/hooks/3ph7NZx2kybPjT6R8uJc/webhook-trigger/veRQNppfA3zOPqfwIgBV",
      request_options
    );
    await request.json();
    window.open("{{ custom_values.ishiguro_redirect_url }}", "_self");
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
  recommended_ai_statement.innerHTML = "";
  recommended_tracking_name.value = "";

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
  recommended_tracking_name.value = "";
  recommended_ai_statement.innerHTML = "";
  const selected_option = offer_name.options[e.target.selectedIndex];
  const category_index = selected_option.dataset.index;

  if (!category_index) return;

  const data = selected_option.form_data[Number(category_index)];

  recommended_tracking_name.value = data.Recommended_Tracking_Name;
  recommended_ai_statement.innerHTML = data.Recommended_AI_Statement;
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
