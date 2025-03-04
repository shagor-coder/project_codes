const tabSelect = document.createElement("select");
tabSelect.classList = "_worksTabSelect";

const createTabDropdown = (tabs = []) => {
  tabSelect.innerHTML = "";
  tabs.forEach((t, index) => {
    const option = document.createElement("option");
    option.innerHTML = t.textContent?.trim();
    option.value = t.textContent?.trim();
    index === 0 && option.selected;
    tabSelect.appendChild(option);
  });
};

const handleTabClick = (tabContentRows = [], tabName = "") => {
  tabContentRows.forEach((tr) => {
    const selectedTabClassName = Array.from(tr.classList).find((cl) =>
      cl.includes("_content")
    );
    const selectedTabName = selectedTabClassName.split("-")[1];
    if (selectedTabName === tabName) return tr.classList.add("active");
    else return tr.classList.remove("active");
  });
};

document.addEventListener("hydrationDone", () => {
  setTimeout(() => {
    const tabParent = document.querySelector(".works-tab");
    const tabElements = [...document.querySelectorAll(".works-tab p")];
    const tabContentRows = [...document.querySelectorAll(".works-content")];

    if (window.innerWidth < 768)
      return (
        createTabDropdown(tabElements),
        tabSelect.addEventListener("change", (e) => {
          const selectedTabClassName = e.currentTarget.value
            ?.split("/")[0]
            ?.toLowerCase();
          handleTabClick(tabContentRows, selectedTabClassName);
        }),
        (tabParent.innerHTML = ""),
        tabParent.appendChild(tabSelect)
      );

    tabElements[0].classList.add("active");
    tabElements.forEach((te) =>
      te.addEventListener("click", (e) => {
        tabElements.forEach((te) => te.classList.remove("active"));
        te.classList.add("active");
        const selectedTabClassName = e.currentTarget.textContent
          ?.split("/")[0]
          ?.toLowerCase();
        handleTabClick(tabContentRows, selectedTabClassName);
      })
    );
  }, 100);
});
