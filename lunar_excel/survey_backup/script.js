let questions = [];
let previewDiv = "";
let index = 0;

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

function returnElementByPromise(selector) {
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
}

function addSurveyProgress() {
  questions = [...document.querySelectorAll(".ghl-question")];
  let form = document.querySelector("#_builder-form");

  let div = document.createElement("div");
  let child = document.createElement("div");
  form.append(div);
  div.appendChild(child);
  div.className = "percent-container";
  child.className = "percent-preview";
  div.setAttribute = "data-percent";

  previewDiv = document.querySelector(".percent-preview");
  previewDiv.style.width = parseInt((1 / questions.length) * 100) + "%";

  let questionContainer = document.querySelector(".ghl-question-set");

  let config = { attributes: true, children: true, subtree: true };
  let mutationObserver = new MutationObserver(mutationCallback);
  mutationObserver.observe(questionContainer, config);
  function mutationCallback(mutationList, observe) {
    mutationList.forEach((mutation) => {
      if (mutation.attributeName !== "class") return;
      let targetClass = mutation.target.classList;
      let isNext = targetClass.contains("ghl-page-rotateSlideOutNext");
      let isPrevious = targetClass.contains("ghl-page-rotateSlideOutPrev");
      if (isNext)
        addAndRemoveActiveClass("NEXT"), addAndRemoveNextButton("NEXT");
      if (isPrevious)
        addAndRemoveActiveClass("PREVIOUS"), addAndRemoveNextButton("PREVIOUS");
    });
  }
}

function activeSlideIndex(questions = []) {
  let activeSlide = questions.find((slide) => {
    return slide.classList.contains("ghl-page-current");
  });

  index = questions.indexOf(activeSlide);

  return (index += 1);
}

function addAndRemoveActiveClass(actionType) {
  index = activeSlideIndex(questions);

  const circleLoaderCheckmark = document.querySelector(
    ".circle-loader-checkmark"
  );

  if (actionType === "PREVIOUS" && index > 2) index--;

  if (index !== 3 && actionType === "PREVIOUS")
    circleLoaderCheckmark.classList.remove("loaded"),
      circleLoaderCheckmark.parentElement.classList.remove("success");

  if (index === 3 && actionType === "NEXT")
    runLoadingAnimation(circleLoaderCheckmark);

  if (index === 4) addErrorElementToAllInput(questions[questions.length - 1]);

  if (actionType === "NEXT") index++;

  let percent = parseFloat(index / questions.length).toFixed(2) * 100;
  previewDiv.style.width = `${percent}%`;
}

function runLoadingAnimation(circleLoaderCheckmark) {
  const ghlNextButton = document.querySelector(
    ".ghl-next-button:not(input[type='submit'])"
  );

  ghlNextButton.style.display = "none";

  setTimeout(() => {
    circleLoaderCheckmark.classList.add("loaded");
    circleLoaderCheckmark.parentElement.classList.add("success");
    console.log("Hello");
  }, 2500);

  setTimeout(() => {
    ghlNextButton.click();
  }, 3500);
}

function removeStarFromLabel() {
  let allLabels = document.querySelectorAll("#_builder-form label");
  allLabels.forEach((label) => {
    let span = label.querySelector("span");
    if (span === null) return;
    if (span.innerText.includes("*")) {
      span.remove();
    }
  });
}

function hideNextButtonDefault() {
  const currentSlide = document.querySelector(".ghl-page-current");
  const continueBtn = document.querySelector(".ghl-next-button");

  const optionRadio = currentSlide.querySelectorAll(".option-radio");

  if (optionRadio.length === 0) {
    continueBtn.style.display = "flex";
  } else {
    continueBtn.style.display = "none";
  }
}

function addAndRemoveNextButton(actionType) {
  if (actionType) {
    const currentSlide = document.querySelector(".ghl-page-current");
    const continueBtn = document.querySelector(".ghl-next-button");

    const optionRadio = currentSlide.querySelectorAll(".option-radio");

    if (optionRadio.length === 0 && index !== 4) {
      continueBtn.style.display = "flex";
    } else {
      continueBtn.style.display = "none";
    }
  }
}

async function addErrorElementToAllInput(activeSlide) {
  const inputs = [
    ...activeSlide.querySelectorAll(
      ".ghl-page-current .form-builder--item-input input"
    ),
  ];

  if (!inputs.length) return;

  inputs.forEach((inputField) => {
    const errorContainer = document.createElement("div");
    errorContainer.style.display = "none";
    errorContainer.style.marginTop = "10px";
    errorContainer.innerHTML = `<p style="color:#ff0010; font-family:'Montserrat',sans-serif;font-weight: 700;">Please fill in ${inputField.placeholder}</p>`;
    errorContainer.classList = "custom-input-error";
    let inputParent = inputField.parentElement;
    if (!inputParent) return console.log("Input Parent Not Found");
    inputParent.style = `position:relative;`;
    if (inputParent.querySelector(".custom-input-error")) return;
    inputParent.append(errorContainer);
  });

  const submitButton = await returnElementByPromise(
    ".ghl-footer input[type='submit']"
  );

  console.log(submitButton);

  submitButton?.addEventListener("click", () => {
    checkInputValue(activeSlide);
  });
}

function checkInputValue(activeSlide) {
  const inputs = [
    ...activeSlide.querySelectorAll(".form-builder--item-input input"),
  ];

  if (!inputs.length) return;

  inputs.forEach((input) => {
    showErrorElement(input);
  });
}

async function showErrorElement(input) {
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
}

// Add Progressbar on top
addSurveyProgress();

// Remove All * From Label
removeStarFromLabel();

// Hide Next Button By Default
hideNextButtonDefault();
