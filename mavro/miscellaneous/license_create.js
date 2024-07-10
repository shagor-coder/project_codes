const licenseData = [
  {
    state: "Alabama",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82b05c3e69574.png",
  },
  {
    state: "Arizona",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4029152952997f3498.png",
  },
  {
    state: "Arkansas",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82b01e3e69573.png",
  },
  {
    state: "California",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4055bb620caca1046c.png",
  },
  {
    state: "Colorado",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4029152956247f3499.png",
  },
  {
    state: "Connecticut",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a402915293a3f7f3496.png",
  },
  {
    state: "Delaware",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82b99c9e69575.png",
  },
  { state: "District of Columbia", license: "" },
  {
    state: "Georgia",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82bbce3e69576.png",
  },
  {
    state: "Idaho",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a40291529b3b67f3495.png",
  },
  {
    state: "Indiana",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a402915298bb37f3497.png",
  },
  {
    state: "Iowa",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82be803e69577.png",
  },
  {
    state: "Kansas",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82b33eae69578.png",
  },
  {
    state: "Louisiana",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82b6e4ae69579.png",
  },
  { state: "Maine", license: "" },
  {
    state: "Maryland",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82b34cbe6957c.png",
  },
  {
    state: "Massachusetts",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a442915297d817f349d.png",
  },
  { state: "Michigan", license: "" },
  {
    state: "Mississippi",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4055bb628f58a10470.png",
  },
  {
    state: "Missouri",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4055bb625d6fa1046e.png",
  },
  {
    state: "Nebraska",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82b4ce2e6957d.png",
  },
  {
    state: "New Hampshire",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4055bb6235f1a1046f.png",
  },
  {
    state: "North Carolina",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4002c82b4a4fe6957a.png",
  },
  {
    state: "North Dakota",
    license:
      "https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645d6a4055bb62eb72a1046d.png",
  },
];

function appendButtons() {
  const buttonsContainer = document.querySelector("#license_buttons");

  licenseData.forEach((license) => {
    if (!license.license) return;

    const btn = document.createElement("span");
    btn.classList = "license-btn";
    btn.dataset.src = license.license.trim();
    btn.innerHTML = `<img src="https://storage.googleapis.com/msgsndr/TyAe1vO3PCuAbuCijYEf/media/645fd8ed02c82b297de8969e.svg+xml" alt=${license.state.trim()}/> <span>${license.state.trim()}</span>`;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      handleButtonClick(license);
    });
    buttonsContainer.append(btn);
  });
}

async function handleButtonClick(license) {
  const popupBtn = document.querySelector(".popup-btn");
  popupBtn?.click();
  await wait(100);
  const licenseImageEl = document.querySelector(".license-image");

  if (window.innerWidth < 640 && licenseImageEl) {
    licenseImageEl.parentElement.parentElement.innerHTML = `<img src=${license.license} alt="" class="hl-optimized mw-100 license-image img-none img-border-none img-shadow-none img-effects-none" loading="lazy">`;
  }

  licenseImageEl.src = license.license ? license.license : "";
}

appendButtons();

function wait(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
}
