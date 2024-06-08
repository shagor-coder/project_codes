const wait = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const return_element_by_promise = (selector) => {
  let intervalName;
  let selected;
  return new Promise((resolve, reject) => {
    intervalName = setInterval(() => {
      selected = [...document.querySelectorAll(selector)];
      if (!selected.length) return;
      clearInterval(intervalName);
      if (selected.length === 1) return resolve(selected[0]);
      if (selected.length > 0) return resolve(selected);
    }, 500);

    setTimeout(() => {
      if (!selected.length) {
        clearInterval(intervalName);
        resolve(false);
      }
    }, 20000);
  });
};

let observer = null;
const questions = [...document.querySelectorAll(".ghl-question")];
const total_slide = questions.length;
const second_last = total_slide - 1;

const form = document.querySelector("#_builder-form");

const div = document.createElement("div");
const child = document.createElement("div");
form.append(div);
div.appendChild(child);
div.className = "percent-container";
child.className = "percent-preview";
div.setAttribute = "data-percent";

previewDiv = document.querySelector(".percent-preview");
previewDiv.style.width = parseInt((1 / questions.length) * 100) + "%";

const check_input_value = (active_slide) => {
  const inputs = [
    ...active_slide.querySelectorAll(".form-builder--item-input input"),
  ];

  if (!inputs.length) return console.log("No inputs found!");

  inputs.forEach((input) => {
    show_error_element(input);
  });
};

const run_loading_animation = (circle_loader, current_slide_index) => {
  if (current_slide_index !== second_last) return;

  const ghl_next_button = document.querySelector(
    ".ghl-next-button:not(input[type='submit'])"
  );

  ghl_next_button ? (ghl_next_button.style = `display: none !important`) : null;

  setTimeout(() => {
    circle_loader.classList.add("loaded");
    circle_loader.parentElement.classList.add("success");
  }, 2500);

  setTimeout(() => {
    ghl_next_button && ghl_next_button.click();
  }, 3500);
};

const show_error_element = async (input) => {
  const isInputValid = input.value;
  const inputParent = input.parentElement.parentElement;
  const inputError = inputParent.querySelector(".custom-input-error");

  if (!isInputValid) {
    inputError.style.display = "block";
    return;
  }

  inputError.style.display = "none";

  await wait(500);

  const mainErrorContainer = document.querySelector(".alert.alert-danger");

  if (mainErrorContainer) {
    const allError = [...mainErrorContainer.querySelectorAll("span")];

    if (!allError.length) return console.log("No alert");

    const isPhoneError = allError.find((error) => {
      return error.innerText.trim().includes("Invalid phone");
    });

    if (isPhoneError && inputError.parentElement.id === "form-phone") {
      inputError.innerHTML = ` <p style="color:#ff0010; font-family:'Montserrat',sans-serif;font-weight: 700;">Please enter a valid number!</p>`;
      inputError.style.display = "block";
    }
  }
};

const add_error_element_to_all_input = async (active_slide) => {
  const inputs = [
    ...active_slide.querySelectorAll(
      ".ghl-page-current .form-builder--item-input input"
    ),
  ];

  if (!inputs.length) return console.log("No inputs found!");

  inputs.forEach((inputField) => {
    const errorContainer = document.createElement("div");
    errorContainer.style.display = "none";
    errorContainer.style.marginTop = "10px";
    errorContainer.innerHTML = `<p style="color:#ff0010; font-family:'Montserrat',sans-serif;font-weight: 700;">${inputField.placeholder} required</p>`;
    errorContainer.classList = "custom-input-error";
    let inputParent = inputField.parentElement;
    if (!inputParent) return console.log("Input Parent Not Found");
    inputParent.style = `position:relative;`;
    if (inputParent.querySelector(".custom-input-error")) return;
    inputParent.append(errorContainer);
  });

  const submitButton = await return_element_by_promise(
    ".ghl-footer input[type='submit']"
  );

  submitButton?.addEventListener("click", () => {
    check_input_value(active_slide);
  });
};

const track_survey_progress = (current_slide) => {
  const current_slide_index = questions.indexOf(current_slide) + 1;
  let percent =
    parseFloat(current_slide_index / questions.length).toFixed(2) * 100;
  previewDiv.style.width = `${percent}%`;

  const circle_loader = document.querySelector(".circle-loader-checkmark");

  const is_radio = [
    ...current_slide.querySelectorAll(".option-radio,.multiselect__tags"),
  ];

  if (is_radio.length) {
    document
      .querySelectorAll(".ghl-next-button:not(input[type='submit'])")
      .forEach((button) => {
        button.style = `display: none !important;`;
      });
  } else if (current_slide_index !== second_last) {
    document
      .querySelectorAll(".ghl-next-button:not(input[type='submit'])")
      .forEach((button) => {
        button.style = `display: flex !important;`;
      });
  }

  if (current_slide_index < second_last)
    circle_loader?.classList?.remove("loaded"),
      circle_loader?.parentElement?.classList.remove("success");

  if (current_slide_index === second_last && current_slide_index <= total_slide)
    run_loading_animation(circle_loader, current_slide_index);

  if (current_slide_index === total_slide)
    add_error_element_to_all_input(current_slide);
};

const mutation_callback = (time_out) => {
  let timeout_id = null;
  let old_slide = null;
  return () => {
    clearTimeout(timeout_id);
    timeout_id = setTimeout(() => {
      wait(50).then(() => {
        const current_slide = document.querySelector(".ghl-page-current");
        if (!current_slide) return console.log("Current slide not found!");

        if (old_slide === current_slide) return;
        old_slide = current_slide;

        track_survey_progress(current_slide);
      });
    }, time_out);
  };
};

observer = new MutationObserver(mutation_callback(50));

const add_mutation_observer = () => {
  const _builder_form = document.querySelector(".ghl-question-set");

  if (!_builder_form) return console.log("Builder form not found");

  observer.observe(_builder_form, {
    childList: true,
    subtree: true,
    attributes: true,
  });
};

add_mutation_observer();
