const headerSec = document.querySelector(".header-sec");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) headerSec.classList.add("sticky-header");
  else headerSec.classList.remove("sticky-header");
});

const swiper_pagination_el = document.createElement("div");
swiper_pagination_el.classList = "swiper-pagination";

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

  swiper_row.append(swiper_pagination_el);
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
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: index === 0 ? 6000 : 5000,
    effect: index === 0 ? "fade" : "slide",
    slidesPerView: index === 0 ? 1 : index === 1 ? 6 : 3,
    breakpoints: {
      320: {
        slidesPerView: index === 0 ? 1 : index === 1 ? 2 : 1,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: index === 0 ? 1 : index === 1 ? 3 : 1,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: index === 0 ? 1 : index === 1 ? 6 : 3,
        spaceBetween: 40,
      },
    },
    spaceBetween: 30,
    loop: true,
    pagination: false,
  });
}

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {}, 1000);
});

const swiper_rows = [...document.querySelectorAll(".swiper-row")];
swiper_rows.forEach(remove_ghl_classes);
