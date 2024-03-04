import { rebuttal_container_wrapper } from "./create_rebuttal_html";
import { script_container_wrapper } from "./create_script_html";

let positions_rebuttal = {
  top: 0,
  left: 0,
  old_top: 0,
  old_left: 0,
};

let positions_script = {
  top: 0,
  left: 0,
  old_top: 0,
  old_left: 0,
};

const handle_mouse_move = (e) => {
  e.preventDefault();

  const type = e.target.dataset.type;

  if (e.clientX < 0 || e.clientY < 0) return console.log("Not enough");

  if (type === "script") {
    positions_script.left = positions_script.old_left - e.clientX;
    positions_script.top = positions_script.old_top - e.clientY;

    positions_script.old_left = e.clientX;
    positions_script.old_top = e.clientY;

    script_container_wrapper.style.left =
      script_container_wrapper.offsetLeft - positions_script.left + "px";
    script_container_wrapper.style.top =
      script_container_wrapper.offsetTop - positions_script.top + "px";
  }

  if (type === "rebuttal") {
    positions_rebuttal.left = positions_rebuttal.old_left - e.clientX;
    positions_rebuttal.top = positions_rebuttal.old_top - e.clientY;

    positions_rebuttal.old_left = e.clientX;
    positions_rebuttal.old_top = e.clientY;

    rebuttal_container_wrapper.style.left =
      rebuttal_container_wrapper.offsetLeft - positions_rebuttal.left + "px";
    rebuttal_container_wrapper.style.top =
      rebuttal_container_wrapper.offsetTop - positions_rebuttal.top + "px";
  }
};

const handle_mouse_up = (e) => {
  e.preventDefault();

  window.removeEventListener("mousemove", handle_mouse_move);
  window.removeEventListener("mouseup", handle_mouse_up);
};

export const handle_element_drag = (e) => {
  e.preventDefault();

  positions_script.old_left = e.clientX;
  positions_script.old_top = e.clientY;

  window.addEventListener("mouseup", handle_mouse_up);
  window.addEventListener("mousemove", handle_mouse_move);
};

export const handle_element_drag_rebuttal = (e) => {
  e.preventDefault();

  positions_rebuttal.old_left = e.clientX;
  positions_rebuttal.old_top = e.clientY;

  window.addEventListener("mouseup", handle_mouse_up);
  window.addEventListener("mousemove", handle_mouse_move);
};
