const swiperButtonNext = document.createElement("div");
swiperButtonNext.className = "swiper-button-next";
const swiperButtonPrev = document.createElement("div");
swiperButtonPrev.className = "swiper-button-prev";
const swiperPagination = document.createElement("div");
swiperPagination.className = "swiper-pagination";

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

  swiper_row.append(swiperButtonPrev);
  swiper_row.append(swiperButtonNext);
  swiper_row.append(swiperPagination);
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
    autoplay: false,
    speed: 1500,
    slidesPerView: 1,
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
        slidesPerView: 1,
        spaceBetween: 40,
      },
    },
    loop: true,
    pagination: {
      el: swiper_row.querySelector(".swiper-pagination"),
      clickable: true,
    },
    navigation: {
      nextEl: swiper_row.querySelector(".swiper-button-next"),
      prevEl: swiper_row.querySelector(".swiper-button-prev"),
    },
  });
}

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {
    if (window.innerWidth > 767) return;
    else {
      const swiper_rows = [...document.querySelectorAll(".my-swiper")];
      swiper_rows.forEach(remove_ghl_classes);
    }
  }, 1000);
});
