function animations() {
  const typed = new Typed(
    ".chat-example-sec .chat-row .img-feature-container .featureText p",
    {
      strings: ["Online", "Try me now!"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    }
  );
}

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {
    animations();
  }, 100);
});
