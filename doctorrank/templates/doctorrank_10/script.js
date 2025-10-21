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

    const newElement = document.createElement("div");

    newElement.classList = `team-info`;

    const elements = [
      ...sc.querySelectorAll(
        "div:nth-child(2),div:nth-child(3),div:nth-child(4)"
      ),
    ];

    elements?.forEach((el) => {
      newElement.append(el);
    });

    swiper_columns_inner.append(newElement);
  });
  swiper_row.append(swiperPagination);
  check_swiper_init(index, swiper_row);
}

function check_swiper_init(index, swiper_row) {
  let interval;
  let timeoutId;
  interval = setInterval(() => {
    if (Swiper) (clearInterval(interval), call_swiper_init(index, swiper_row));
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
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },

      1080: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    loop: true,
    pagination: { el: ".swiper-pagination" },
  });
}

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {
    const swiper_rows = [...document.querySelectorAll(".mySwiper")];
    swiper_rows.forEach(remove_ghl_classes);
  }, 100);
});
