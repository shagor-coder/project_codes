let observer;

const wait = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const mutation_callback = async (mutationList) => {
  await wait(200);

  const current_slide = document.querySelector(".ghl-page-current");

  if (!current_slide) return console.log("No current slide");

  const is_radio = [...current_slide.querySelectorAll(".option-radio")];

  if (!is_radio.length)
    return [
      ...document.querySelectorAll(
        ".ghl-btn.ghl-submit-btn,.ghl-btn.ghl-footer-next"
      ),
    ].forEach((button) => {
      button.style = `display: flex !important;`;
    });

  [
    ...document.querySelectorAll(
      ".ghl-btn.ghl-submit-btn,.ghl-btn.ghl-footer-next"
    ),
  ].forEach((button) => {
    button.style = `display:none !important;`;
  });
};
observer = new MutationObserver(mutation_callback);

export const hide_next_btn_for_radio = () => {
  const _builder_form = document.querySelector(".ghl-question-set");

  if (!_builder_form) return console.log("Builder form not found");

  observer.observe(_builder_form, {
    childList: true,
    subtree: true,
    attributes: true,
  });
};
