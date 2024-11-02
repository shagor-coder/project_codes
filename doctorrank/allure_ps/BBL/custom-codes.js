// Slider System
const swiperRows = [...document.querySelectorAll(".swiper-row")];

function removeGHLClasses(swiperRow) {
  const swiperPaginationContainer = document.createElement("div");
  swiperPaginationContainer.classList = "swiper-pagination";

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

  swiperRow.append(swiperPaginationContainer);

  checkSwiperInit(swiperRow);
}

function checkSwiperInit(swiperRow) {
  let interval;
  interval = setInterval(() => {
    if (!Swiper) return;
    else clearInterval(interval), callSwiperInitForRows(swiperRow);
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}

function callSwiperInitForRows(swiperRow) {
  new Swiper(swiperRow, genrateSwiperOptions());
}

function genrateSwiperOptions() {
  const swiperOptions = {
    autoplay: {
      delay: 5000,
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
    navigation: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  return swiperOptions;
}

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {
    swiperRows.forEach(removeGHLClasses);
  }, 100);
});
