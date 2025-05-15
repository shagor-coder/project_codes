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
  index === 0 && swiper_row.append(swiperPagination);
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
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
    loop: true,
    pagination:
      index === 0
        ? {
            el: ".swiper-pagination",
          }
        : false,
    navigation: false,
  });
}

function insertReviewerNameChar() {
  const allImgFeature = [
    ...document.querySelectorAll(".reviews-sec .swiper-row .c-image-feature"),
  ];

  allImgFeature?.forEach((imgF) => {
    const featureHeadLine = imgF.querySelector(".featureHeadline");
    if (!featureHeadLine) return;
    const reviewerName = featureHeadLine.textContent.split("")[0].toUpperCase();

    const featureImg = imgF.querySelector(".img-container");
    featureImg && (featureImg.innerHTML = `<div>${reviewerName}</div>`);
  });
}

function handleLearnMoreClick(
  detailEl,
  learnMoreBtn,
  fullDetails,
  trimmedDetails
) {
  if (learnMoreBtn.classList.contains("active")) {
    learnMoreBtn.classList.remove("active");
    learnMoreBtn.innerHTML = `Read More <i class="fas fa-angle-down"></i>`;
    detailEl.innerHTML = `${trimmedDetails}...`;
  } else {
    learnMoreBtn.classList.add("active");
    learnMoreBtn.innerHTML = `Read Less <i class="fas fa-angle-up"></i>`;
    detailEl.innerHTML = `${fullDetails}`;
  }
}

function addLearnMoreToDoctoreDetails() {
  const allDetails = [
    ...document.querySelectorAll(
      ".team-sec .card-row .c-paragraph .text-output"
    ),
  ];

  allDetails.forEach((detail) => {
    const learnMoreBtn = document.createElement("p");
    learnMoreBtn.innerHTML = `Read More <i class="fas fa-angle-down"></i>`;
    detail.append(learnMoreBtn);
    const detailEl = detail.querySelector("p");

    const fullDetails = detailEl.textContent.trim();
    const trimmedDetails = detailEl.textContent.slice(0, 170);
    detailEl.innerHTML = trimmedDetails + "...";

    learnMoreBtn.addEventListener("click", () => {
      handleLearnMoreClick(detailEl, learnMoreBtn, fullDetails, trimmedDetails);
    });
  });
}

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {
    const swiper_rows = [...document.querySelectorAll(".swiper-row")];
    swiper_rows.forEach(remove_ghl_classes);
    insertReviewerNameChar();
    addLearnMoreToDoctoreDetails();
  }, 100);
});
