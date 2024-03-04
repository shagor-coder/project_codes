import { handle_element_drag } from "./handle_element_drag";

export const script_container_wrapper = document.createElement("div");
script_container_wrapper.className = "script_container_wrapper";

export const create_script_html = (category, script, presentation) => {
  script_container_wrapper.innerHTML = "";

  const single_script_wrapper = document.createElement("div");
  single_script_wrapper.className = "single_script_wrapper";

  single_script_wrapper.innerHTML = `
    <h2 class="single_script_header" data-type="script">${category}</h2>
    <button class="close_script_button"><i class="fa fa-times"></i></button>
    <div class="single_script_body">
      <ul class="single_script_wrapper_nav">
       <button class="single_script_button active">Phone Script</button>
       <button class="single_script_button">Presentation</button>
      </ul>

      <div class="single_script_container">
        <div class="single_script active">
          ${script}
        </div>
        <div class="single_script">
          ${presentation}
        </div>
      </div>
    </div>
  `;

  const close_script_button = single_script_wrapper.querySelector(
    ".close_script_button"
  );

  const single_script_header = single_script_wrapper.querySelector(
    ".single_script_header"
  );

  single_script_header.addEventListener("mousedown", handle_element_drag);

  close_script_button.addEventListener("click", () => {
    script_container_wrapper.remove();
  });

  const single_script_buttons = [
    ...single_script_wrapper.querySelectorAll(".single_script_button"),
  ];

  const single_scripts_container = [
    ...single_script_wrapper.querySelectorAll(".single_script_container div"),
  ];

  single_script_buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      single_script_buttons.forEach((sb) => {
        sb.classList.remove("active");
      });

      single_scripts_container.forEach((ss) => {
        ss.classList.remove("active");
      });

      button.classList.add("active");
      single_scripts_container[index].classList.add("active");
    });
  });

  script_container_wrapper.appendChild(single_script_wrapper);
  document.body.appendChild(script_container_wrapper);
};
