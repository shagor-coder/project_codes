function remove_ghl_classes(swiper_row, index) {
  const swiper_row_inner = swiper_row.querySelector(".inner");
  swiper_row_inner.classList = "";
  swiper_row_inner.classList = "swiper-wrapper";

  const swiperNextButton = document.createElement("div");
  swiperNextButton.classList = `swiper-button-next`;
  const swiperPrevButton = document.createElement("div");
  swiperPrevButton.classList = `swiper-button-prev`;

  const swiperPagination = document.createElement("div");
  swiperPagination.classList = `swiper-pagination`;

  const swiper_columns = [...swiper_row.querySelectorAll(".c-column")];

  swiper_columns.forEach((sc) => {
    sc.classList = "";
    sc.classList = "swiper-slide";
    const swiper_columns_inner = sc.querySelector(".inner");
    swiper_columns_inner.classList = "";
  });
  index === 0 && swiper_row.append(swiperNextButton);
  index === 0 && swiper_row.append(swiperPrevButton);
  index === 2 && swiper_row.append(swiperPagination);
  check_swiper_init(index, swiper_row);
}

function check_swiper_init(index, swiper_row) {
  let interval;
  let timeoutId;
  interval = setInterval(() => {
    if (Swiper) clearInterval(interval), call_swiper_init(index, swiper_row);
    else console.log("FN Called");
  }, 300);

  timeoutId = setTimeout(() => {
    clearInterval(interval);
    clearTimeout(timeoutId);
  }, 10000);
}

function call_swiper_init(index, swiper_row) {
  new Swiper(swiper_row, {
    autoplay: true,
    speed: 1500,
    centeredSlides: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },

      1080: {
        slidesPerView: index === 1 ? 4 : 3,
        spaceBetween: 40,
      },
    },
    loop: true,
    pagination:
      index === 2
        ? {
            el: ".swiper-pagination",
          }
        : false,
    navigation:
      index === 0
        ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }
        : false,
  });
}

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {
    const swiper_rows = [...document.querySelectorAll(".swiper-row")];
    swiper_rows.forEach(remove_ghl_classes);
  }, 100);
});
