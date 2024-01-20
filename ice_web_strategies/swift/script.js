const headerSec = document.querySelector(".header-sec");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) headerSec.classList.add("scroll");
  else headerSec.classList.remove("scroll");
});

const swiper_pagination_el = document.createElement("div");
swiper_pagination_el.classList = "swiper-pagination";

function remove_ghl_classes() {
  const swiper_row = document.querySelector(".swiperRow");

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
}

remove_ghl_classes();

function check_swiper_init() {
  let interval;
  interval = setInterval(() => {
    if (Swiper) clearInterval(interval), call_swiper_init();
    else console.log("FN Called");
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}

function call_swiper_init() {
  new Swiper(".swiper", {
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 3000,
    slidesPerView: 4,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
    spaceBetween: 40,
    loop: true,
    pagination: false,
  });
}
