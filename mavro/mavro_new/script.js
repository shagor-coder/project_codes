const swiperButtonNext = document.createElement("div");
swiperButtonNext.className = "swiper-button-next";
const swiperButtonPrev = document.createElement("div");
swiperButtonPrev.className = "swiper-button-prev";

function remove_ghl_classes(swiper_row, index) {
  const swiper_row_inner = swiper_row.querySelector(".inner");
  swiper_row_inner.classList = "";
  swiper_row_inner.classList = "swiper-wrapper";

  const swiper_columns = [...swiper_row.querySelectorAll(".c-column")];

  swiper_columns.forEach((sc) => {
    sc.classList = "";
    sc.classList = "swiper-slide";
    const swiper_columns_inner = sc.querySelector(".inner");
    swiper_columns_inner.classList = "";
  });

  index === 1 && swiper_row.append(swiperButtonPrev);
  index === 1 && swiper_row.append(swiperButtonNext);
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
    autoplay: index === 0 && {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: index === 0 ? 5000 : 1500,
    slidesPerView: index === 0 ? 6 : 1,
    breakpoints: {
      320: {
        slidesPerView: index === 0 ? 2 : 1,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: index === 0 ? 3 : 1,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: index === 0 ? 6 : 1,
        spaceBetween: 40,
      },
    },
    loop: true,
    pagination: false,
    navigation: index === 1 && {
      nextEl: swiper_row.querySelector(".swiper-button-next"),
      prevEl: swiper_row.querySelector(".swiper-button-prev"),
    },
  });
}

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {}, 1000);
});

const swiper_rows = [...document.querySelectorAll(".mySwiper")];
swiper_rows.forEach(remove_ghl_classes);
