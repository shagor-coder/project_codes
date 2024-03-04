import { handle_element_drag_rebuttal } from "./handle_element_drag";

export const rebuttal_container_wrapper = document.createElement("div");
rebuttal_container_wrapper.classList =
  "script_container_wrapper rebuttal_container_wrapper";

export const create_rebuttal_html = (category, rebuttal) => {
  rebuttal_container_wrapper.innerHTML = "";

  const single_rebuttal_wrapper = document.createElement("div");
  single_rebuttal_wrapper.className = "single_script_wrapper";

  single_rebuttal_wrapper.innerHTML = `
    <h2 class="single_script_header" data-type='rebuttal'>${category}</h2>
    <button class="close_script_button"><i class="fa fa-times"></i></button>
    <div class="single_script_body">
      <div class="single_script_container  single_rebuttal">
        <div class="single_script active">
          ${rebuttal}
        </div>
      </div>
    </div>
  `;

  const close_rebuttal_button = single_rebuttal_wrapper.querySelector(
    ".close_script_button"
  );

  const single_rebuttal_header = single_rebuttal_wrapper.querySelector(
    ".single_script_header"
  );

  single_rebuttal_header.addEventListener(
    "mousedown",
    handle_element_drag_rebuttal
  );

  close_rebuttal_button.addEventListener("click", () => {
    rebuttal_container_wrapper.remove();
  });

  rebuttal_container_wrapper.appendChild(single_rebuttal_wrapper);
  document.body.appendChild(rebuttal_container_wrapper);
};
