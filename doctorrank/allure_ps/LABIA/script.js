function removeGHLClasses(swiperRow, type) {
  const swiperPaginationContainer = document.createElement("div");
  swiperPaginationContainer.classList = "swiper-pagination";
  const swiperNavigationContainer = document.createElement("div");
  swiperNavigationContainer.innerHTML = `
   <div class="swiper-button-next"></div>
   <div class="swiper-button-prev"></div>
  `;

  const swiperRowInner = swiperRow.querySelector(".inner");
  swiperRowInner.classList = "";
  swiperRowInner.classList = "swiper-wrapper";

  const swiperColumns = [...swiperRow.querySelectorAll(".c-column")];

  swiperColumns.forEach((sc) => {
    sc.classList = "";
    sc.classList = "swiper-slide";
    const swiperColumns_inner = sc.querySelector(".inner");
    swiperColumns_inner.classList = "";
  });

  type === "gallery"
    ? swiperRow.append(swiperNavigationContainer)
    : swiperRow.append(swiperPaginationContainer);

  checkSwiperInit(swiperRow, type);
}

function checkSwiperInit(swiperRow, type) {
  let interval;
  interval = setInterval(() => {
    if (!Swiper) return;
    else clearInterval(interval), callSwiperInitForRows(swiperRow, type);
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}

function callSwiperInitForRows(swiperRow, type) {
  new Swiper(swiperRow, genrateSwiperOptions(type));
}

function genrateSwiperOptions(type) {
  const swiperOptions = {
    autoplay: {
      delay: type === "gallery" ? 3000 : 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 3,
    centeredSlides: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
    loop: true,
    navigation:
      type === "gallery"
        ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }
        : false,
    pagination:
      type === "gallery"
        ? false
        : {
            el: ".swiper-pagination",
            clickable: true,
          },
  };

  return swiperOptions;
}

function wait(waitTime) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(true);
    }, waitTime)
  );
}

async function handleGalleryButtonClick() {
  await wait(100);
  const popupFormRow = document.querySelector(".popup-form-row");
  popupFormRow.style = "display: none;";
  const mainPopup = document.querySelector("#hl_main_popup");
  mainPopup?.classList.add("gallery-active");
  await wait(1500);
  const popupSwiperRows = [
    ...document.querySelectorAll("#hl_main_popup .swiper-row"),
  ];

  popupSwiperRows?.forEach((swiperRow) => {
    removeGHLClasses(swiperRow, "gallery");
  });

  const popupSwiperRow = document.querySelector(".popup-swiper-row");
  popupSwiperRow.classList.remove("hide-view");

  document.querySelector(".closeLPModal")?.addEventListener("click", () => {
    popupFormRow.style = "display: block";
    mainPopup.classList.remove("gallery-active");
    popupSwiperRow.classList.add("hide-view");
  });
}

document.addEventListener("hydrationDone", () => {
  setTimeout(async () => {
    // Slider System
    const pageSwiperRows = [
      ...document.querySelectorAll("#preview-container .swiper-row"),
    ];
    pageSwiperRows?.forEach((swiperRow) => {
      removeGHLClasses(swiperRow, "reviews");
    });

    const galleryButton = document.querySelector(".gallery-button");
    galleryButton.addEventListener("click", handleGalleryButtonClick);
  }, 100);
});
