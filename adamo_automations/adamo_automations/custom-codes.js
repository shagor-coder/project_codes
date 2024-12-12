const testimonialsSection = document.querySelector(".testimonials-sec");
function changeSectionToSlider() {
  if (window.innerWidth > 768) return;
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

function removeGHLClasses(swiperRow) {
  if (window.innerWidth < 768) return;
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
    pricingColumns[index].classList.toggle("active");
    featureShowHide.classList.toggle("active");
    featureShowHide.classList.contains("active")
      ? (featureShowHide.querySelector("p").textContent = "Hide All Feature")
      : (featureShowHide.querySelector("p").textContent = "View All Features");

    // Scroll to the target element
    pricingColumns[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Typing and CountUp animations
function animations() {
  const typed = new Typed(
    window.innerWidth < 768
      ? ".mobile-only .typingText strong"
      : ".desktop-only .typingText strong",
    {
      strings: ["Automating Industries!", "Creating systems"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    }
  );

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
}

function handleViewMoreClicks() {
  if (window.innerWidth > 767) return;

  // Handler for Automate
  const swiperRowColsAutomate = [
    ...document.querySelectorAll(".automate-sec .swiperRow .c-column"),
  ];
  const swiperRowViewMoreBtn = document.querySelector(
    ".automate-sec .view-more-btn"
  );

  swiperRowViewMoreBtn.addEventListener("click", () => {
    swiperRowColsAutomate
      .slice(3, swiperRowColsAutomate.length)
      .forEach((col) => col.classList.toggle("active"));

    swiperRowViewMoreBtn.classList.toggle("active");
    swiperRowViewMoreBtn.classList.contains("active")
      ? (swiperRowViewMoreBtn.innerHTML = `<div style="" class="main-heading-group"><div class="button-icon-start"></div><div class="main-heading-button">Show Less Services</div><div style="width: 17px; margin-left: 7px;display: flex;
    align-items: center;
    justify-content: center;"><img  style="width: 17px;" src="https://storage.googleapis.com/msgsndr/pE0YHF1zH4QJ2Hb9JR8A/media/671de16a6e56115b84424df3.svg" alt="Adamo Automations"/></div></div>`)
      : (swiperRowViewMoreBtn.innerHTML = `<div style="" class="main-heading-group"><div class="button-icon-start"></div><div class="main-heading-button">View More Industries</div><div style="width: 17px; margin-left: 7px;display: flex;
    align-items: center;
    justify-content: center;"><img style="width: 17px;" src="https://storage.googleapis.com/msgsndr/pE0YHF1zH4QJ2Hb9JR8A/media/671de19cd2e1af2ce4a0e9f6.svg"  alt="Adamo Automations"/></div></div>`);

    // Scroll to the target element
    swiperRowColsAutomate[2].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  // Handler for Services
  const swiperRowColsServices = [
    ...document.querySelectorAll(".services-sec .swiperRow .c-column"),
  ];
  const swiperRowViewMoreBtnServices = document.querySelector(
    ".services-sec .view-more-btn"
  );

  swiperRowViewMoreBtnServices.addEventListener("click", () => {
    swiperRowColsServices
      .slice(3, swiperRowColsServices.length)
      .forEach((col) => col.classList.toggle("active"));

    swiperRowViewMoreBtnServices.classList.toggle("active");
    swiperRowViewMoreBtnServices.classList.contains("active")
      ? (swiperRowViewMoreBtnServices.innerHTML = `<div style="" class="main-heading-group"><div class="button-icon-start"></div><div class="main-heading-button">Show Less Services</div><div style="width: 17px; margin-left: 7px;display: flex;
    align-items: center;
    justify-content: center;"><img  style="width: 17px;" src="https://storage.googleapis.com/msgsndr/pE0YHF1zH4QJ2Hb9JR8A/media/671de16a6e56115b84424df3.svg" alt="Adamo Automations"/></div></div>`)
      : (swiperRowViewMoreBtnServices.innerHTML = `<div style="" class="main-heading-group"><div class="button-icon-start"></div><div class="main-heading-button">View More Services</div><div style="width: 17px; margin-left: 7px;display: flex;
    align-items: center;
    justify-content: center;"><img style="width: 17px;" src="https://storage.googleapis.com/msgsndr/pE0YHF1zH4QJ2Hb9JR8A/media/671de19cd2e1af2ce4a0e9f6.svg"  alt="Adamo Automations"/></div></div>`);

    // Scroll to the target element
    swiperRowColsServices[2].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

const faqsElements = [
  ...document.querySelectorAll(".faqs-sec .faq-row .hl-faq-child"),
];

faqsElements.slice(0, 3).forEach((faq) => (faq.dataset.show = "show"));

const faqsViewMore = document.querySelector(".faqs-sec .view-more-btn");

faqsViewMore.addEventListener("click", () => {
  faqsViewMore.classList.toggle("active");

  if (faqsViewMore.classList.contains("active")) {
    faqsElements
      .slice(3, faqsElements.length)
      .forEach((col) => (col.dataset.show = "show"));

    faqsViewMore.innerHTML = `<div style="" class="main-heading-group"><div class="button-icon-start"></div><div class="main-heading-button">Show Less FAQs</div><div style="width: 17px; margin-left: 7px;display: flex;
    align-items: center;
    justify-content: center;"><img  style="width: 17px;" src="https://storage.googleapis.com/msgsndr/pE0YHF1zH4QJ2Hb9JR8A/media/671de16a6e56115b84424df3.svg" alt="Adamo Automations"/></div></div>`;
  } else {
    faqsElements
      .slice(3, faqsElements.length)
      .forEach((col) => (col.dataset.show = "hide"));

    faqsViewMore.innerHTML = `<div style="" class="main-heading-group"><div class="button-icon-start"></div><div class="main-heading-button">View More FAQs</div><div style="width: 17px; margin-left: 7px;display: flex;
    align-items: center;
    justify-content: center;"><img style="width: 17px;" src="https://storage.googleapis.com/msgsndr/pE0YHF1zH4QJ2Hb9JR8A/media/671de19cd2e1af2ce4a0e9f6.svg"  alt="Adamo Automations"/></div></div>`;
  }

  // Scroll to the target element
  faqsElements[2].scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {
    swiperRows.forEach(removeGHLClasses);
    changeSectionToSlider();
    handleViewMoreClicks();
    animations();
  }, 1000);
});