const toolTipContents = {
  mainToolTip:
    "Your exclusive path to radiant skin! Choose one luxurious benefit each month for just $99. Whether you prefer premium skincare products or professional treatments, the choice is yours. Book your services in advance by calling or texting us. Cancel anytime - no commitment required!",
  skinCareToolTip:
    "Select any product from our premium skincare line - whether it's a cleanser, moisturizer, or serum. Value up to $200! Simply choose your preferred product each month. Perfect for maintaining your skincare routine with professional-grade products.",
  facialToolTip:
    "Choose between our signature HydraFacial or Signature Facial (regular value $180). These treatments are customized to your skin's needs, providing deep cleansing, exfoliation, and hydration. Book in advance to secure your preferred appointment time.",
  chemicalPeelToolTip:
    "Select either a Glycolic or Jessner Peel (regular value $250). These professional-grade peels help improve skin texture, reduce fine lines, and enhance overall skin appearance. Appointment required, subject to availability.",
};

const toolTipContainer = document.createElement("div");
toolTipContainer.className = "toolTipContainer";
toolTipContainer.id = "toolTipContainer";

const handleToolTip = (link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.currentTarget.offsetParent.querySelector(".toolTipContainer"))
      return toolTipContainer.remove();
    const selectedToolTip = Object.values(toolTipContents);
    toolTipContainer.innerHTML = `<p>${selectedToolTip[index]}</p>`;
    link.offsetParent.style.position = "relative";
    link.offsetParent.appendChild(toolTipContainer);
  });
};

document.addEventListener("click", (e) => {
  if (
    e.target.parentElement.id !== "toolTipContainer" &&
    toolTipContainer.isConnected
  )
    return toolTipContainer.remove();
});

document.addEventListener("hydrationDone", () => {
  const learnMoreLinks = [...document.querySelectorAll(".learnMore a")];
  learnMoreLinks.forEach(handleToolTip);
});
