import { create_script_html } from "./create_script_html";
import { get_scripts_from_sheet } from "./get_script_from_sheet";

export const call_script_categories = document.createElement("div");
call_script_categories.classList = `call_script_categories hidden`;
document.body.appendChild(call_script_categories);

let category_buttons = [];

const handle_category_btn_click = (e) => {
  e.stopPropagation();
  category_buttons.forEach((category_buttons) => {
    category_buttons.classList.remove("active");
  });
  e.target.classList.add("active");
  const category = e.target.dataset.name;
  const script = e.target.dataset.script;
  const presentation = e.target.dataset.presentation;
  create_script_html(category, script, presentation);
};

export const create_category_buttons = async () => {
  try {
    call_script_categories.innerHTML = "";

    const call_script_data = await get_scripts_from_sheet(
      "https://script.google.com/macros/s/AKfycbyi2Q0fIQVJgoGuiRmYINduGdx3eFMW0pI62ZkmE01GkcXvVbHjYMsCnBV3nphjzKti5g/exec?sheet=0"
    );

    const presentation_data = await get_scripts_from_sheet(
      "https://script.google.com/macros/s/AKfycbyi2Q0fIQVJgoGuiRmYINduGdx3eFMW0pI62ZkmE01GkcXvVbHjYMsCnBV3nphjzKti5g/exec?sheet=1"
    );

    if (!call_script_data.length) return;

    const categories = Object.keys(call_script_data[0]);

    category_buttons = [];

    categories.forEach((category) => {
      let script = call_script_data[0][category];
      let presentation = presentation_data.find((pd) =>
        pd.Includes.toString().includes(category)
      );

      if (!script) return;
      const button = document.createElement("button");
      button.classList = `script_category_button`;
      button.textContent = category;
      button.dataset.name = category;
      button.dataset.script = script;
      button.dataset.presentation = presentation
        ? presentation.Presentation
        : "Hello";

      category_buttons.push(button);

      button.addEventListener("click", handle_category_btn_click, false);
      call_script_categories.append(button);
    });
  } catch (error) {
    console.log(error.message);
  }
};
