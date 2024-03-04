const hero_images = [...document.querySelectorAll(".animated-col .c-image")];

window.addEventListener("mousemove", (e) => {
  hero_images.forEach((img, index) => {
    const movementRatio = 0.03 + index === 0 ? 1 : index + 0.5; // Adjust this value for different movement speeds
    const offsetX = e.clientX - window.innerWidth / 2;
    const offsetY = e.clientY - window.innerHeight / 2;
    const translateX = offsetX * (movementRatio * 0.01); // Adjust multiplier for different ranges of movement
    const translateY = offsetY * (movementRatio * 0.01); // Adjust multiplier for different ranges of movement
    if (index === 0)
      img.style.cssText = `
      will-change: transform !important;
      transform: translate3d(${translateX}px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg) !important;
      transform-style: preserve-3d !important;
    `;
    else
      img.style.cssText = `
      will-change: transform !important;
      transform: translate3d(${translateX}px, ${translateY}px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg) !important;
      transform-style: preserve-3d !important;
    `;
  });
});

const run_loading_animation = () => {
  function debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  }

  function animateOnScroll(animatedElements, animationClass) {
    const triggerOffset = 150;
    const viewportHeight = window.innerHeight;

    function checkAnimation() {
      animatedElements.forEach((animatedElement) => {
        const elementTop = animatedElement.getBoundingClientRect().top;
        const elementHeight = animatedElement.getBoundingClientRect().height;
        let elementTopOffset = Math.abs(elementTop) - elementHeight;

        if (
          elementTop > triggerOffset &&
          elementTop < viewportHeight - triggerOffset
        ) {
          animatedElement.classList.add(animationClass);
        } else if (
          elementTop > elementHeight / -2 &&
          elementTop < viewportHeight - triggerOffset
        ) {
          animatedElement.classList.add(animationClass);
        } else if (elementTop > elementHeight || elementTopOffset > 1) {
          animatedElement.classList.remove(animationClass);
        }
      });
    }

    const debouncedCheckAnimation = debounce(checkAnimation, 50);
    window.addEventListener("scroll", debouncedCheckAnimation);
  }

  const animatedElementsToAnimate = [
    ...document.querySelectorAll(".animate__animated"),
  ];

  animatedElementsToAnimate.forEach((e) => {
    e.classList.add("loaded");
  });

  animateOnScroll(animatedElementsToAnimate, "inView");
};

// Run the loading animation
run_loading_animation();
