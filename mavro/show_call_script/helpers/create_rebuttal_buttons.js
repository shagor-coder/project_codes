import { create_rebuttal_html } from "./create_rebuttal_html";
import { get_scripts_from_sheet } from "./get_script_from_sheet";

export const rebuttal_categories = document.createElement("div");
rebuttal_categories.classList = `rebuttal_categories hidden`;
document.body.appendChild(rebuttal_categories);

let rebuttal_buttons = [];

const handle_category_btn_click = (e) => {
  e.stopPropagation();
  rebuttal_buttons.forEach((rebuttal_buttons) => {
    rebuttal_buttons.classList.remove("active");
  });
  e.target.classList.add("active");
  const category = e.target.dataset.name;
  const rebuttal = e.target.dataset.rebuttal;
  create_rebuttal_html(category, rebuttal);
};

export const create_rebuttal_buttons = async () => {
  try {
    rebuttal_categories.innerHTML = "";
    const rebuttals_data = await get_scripts_from_sheet(
      "https://script.google.com/macros/s/AKfycbyi2Q0fIQVJgoGuiRmYINduGdx3eFMW0pI62ZkmE01GkcXvVbHjYMsCnBV3nphjzKti5g/exec?sheet=2"
    );

    if (!rebuttals_data.length) return;

    const categories = Object.keys(rebuttals_data[0]);

    rebuttal_buttons = [];

    categories.forEach((category) => {
      let rebuttal = rebuttals_data[0][category];
      if (!rebuttal) return;
      const button = document.createElement("button");
      button.classList = `script_category_button`;
      button.textContent = category;
      button.dataset.name = category;
      button.dataset.rebuttal = rebuttal;
      rebuttal_buttons.push(button);
      button.addEventListener("click", handle_category_btn_click, false);
      rebuttal_categories.append(button);
    });
  } catch (error) {
    console.log(error.message);
  }
};
