function runLoadingAnimation() {
  const loadingElement = document.createElement("div");
  loadingElement.className = "loadingElement";
  document.querySelector("body").appendChild(loadingElement);

  loadingElement.classList.add("loading"),
    setTimeout(() => {
      document.querySelector("#preview-container").classList.add("show");
    }, 600),
    setTimeout(() => {
      loadingElement.classList.remove("loading");
      loadingElement.classList.add("loaded");
    }, 1200);
}
runLoadingAnimation();

function runElementLoadingAnimation() {
  const animatedElements = [...document.querySelectorAll(".animate__animated")];

  animatedElements.forEach((animatedElement, index) => {
    let animateClass = [...animatedElement.classList].find(
      (className) =>
        className.includes("animate_") && !className.includes("animated")
    );

    if (index === 0)
      animatedElement.classList.add(animateClass.replace("_", "__"));

    window.addEventListener("scroll", () => {
      let isOnView = animatedElement.getBoundingClientRect().top;

      if (isOnView > 100 && isOnView > 0 && isOnView < window.innerHeight) {
        animatedElement.classList.add(animateClass.replace("_", "__"));
      } else {
        //animatedElement.classList.remove(animateClass.replace("_", "__"));
        //animatedElement.classList.remove(animateClass.replace("_", "__"));
      }
    });
  });
}

setTimeout(() => {
  runElementLoadingAnimation();
}, 600);
