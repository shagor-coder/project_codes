const swiperJs = document.createElement("script");
swiperJs.type = "text/javascript";
swiperJs.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
swiperJs.async = true;

document.body.appendChild(swiperJs);

const testimonialsSection = document.querySelector(".testimonials-sec");
changeSectionToSlider();
function changeSectionToSlider() {
  if (window.innerWidth > 500) return;
  const swiperNavContainer = document.createElement("div");
  swiperNavContainer.innerHTML = `
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div> 
  `;

  testimonialsSection.classList.add("swiperSection");
  testimonialsSection.classList.add("swiper");
  const inner = testimonialsSection.querySelector(".inner");
  inner.classList = "swiper-wrapper";
  const rows = [...testimonialsSection.querySelectorAll(".testimonial-row")];
  rows.forEach((rw) => {
    rw.classList = "swiper-slide";
  });
  testimonialsSection.appendChild(swiperNavContainer);
  checkSwiperInit(true);
}

// Slider System
const swiperRows = [...document.querySelectorAll(".swiperRow")];

swiperRows.forEach(removeGHLClasses);

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

  checkSwiperInit(false, swiperRow);
}

function checkSwiperInit(isSection, swiperRow) {
  let interval;
  interval = setInterval(() => {
    if (!Swiper) return;
    else
      clearInterval(interval),
        isSection
          ? callSwiperInitForSections(isSection)
          : callSwiperInitForRows(isSection, swiperRow);
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
  }, 10000);
}

function callSwiperInitForRows(isSection = false, swiperRow) {
  new Swiper(swiperRow, genrateSwiperOptions(isSection));
}
function callSwiperInitForSections(isSection = false) {
  new Swiper(".swiperSection", genrateSwiperOptions(isSection));
}

function genrateSwiperOptions(isSection) {
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
        slidesPerView: 1,
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
    navigation: isSection && {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  return swiperOptions;
}

// Tab System

const testimonialRows = [...document.querySelectorAll(".testimonial-row")];
const tabs = [...document.querySelectorAll(".tab-row .c-column")];

tabs.forEach((tab) => tab.addEventListener("click", handleTabClick));

function handleTabClick(e) {
  const clickedTab = e.currentTarget;
  const index = tabs.indexOf(clickedTab);
  testimonialRows.forEach((tmr) => tmr.classList.remove("active"));
  tabs.forEach((tb) => tb.classList.remove("active"));

  testimonialRows[index].classList.add("active");
  clickedTab.classList.add("active");
}

// Pricing Toggle

const pricingColumns = [...document.querySelectorAll(".pricing-row .c-column")];
const featureShowHides = [
  ...document.querySelectorAll(".pricing-row .feature-showhide"),
];

featureShowHides.forEach((featureShowHide, index) => {
  featureShowHide.addEventListener("click", (e) => {
    console.log(e);

    pricingColumns[index].classList.toggle("active");
    featureShowHide.classList.toggle("active");
  });
});

// Typing and CountUp animations
setTimeout(() => {
  const typed = new Typed(".typingText strong", {
    strings: ["Automating Industries!", "Creating systems"],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
  });

  const countUpRow = document.querySelector(".counter-row");

  function startCountUp() {
    anime({
      targets: "countUp1",
      innerHTML: [0, 50000],
      round: 1,
      duration: 2000,
      easing: "linear",
      update: function (anim) {
        document.querySelector(".countUp1").innerHTML =
          Math.floor((anim.progress * 50000) / 100) + "+";
      },
    });
    anime({
      targets: "countUp2",
      innerHTML: [0, 1000000],
      round: 1,
      duration: 3000,
      easing: "linear",
      update: function (anim) {
        document.querySelector(".countUp2").innerHTML =
          "$" + Math.floor((anim.progress * 1000000) / 100) + "+";
      },
    });
    anime({
      targets: "countUp3",
      innerHTML: [0, 4000],
      round: 1,
      duration: 2000,
      easing: "linear",
      update: function (anim) {
        document.querySelector(".countUp3").innerHTML =
          Math.floor((anim.progress * 4000) / 100) + "+";
      },
    });
    anime({
      targets: "countUp4",
      innerHTML: [0, 40],
      round: 1,
      duration: 3000,
      easing: "linear",
      update: function (anim) {
        document.querySelector(".countUp4").innerHTML =
          Math.floor((anim.progress * 40) / 100) + "+";
      },
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCountUp();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(countUpRow);
}, 2000);
