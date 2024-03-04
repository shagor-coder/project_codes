let customDropdowns = [];

function formatMenuData(data = []) {
  const menuCategories = data.map((d) => {
    return d.Category;
  });
  const uniqueCategories = [...new Set(menuCategories)];
  return uniqueCategories;
}

export function createCustomDropdown(menuData = []) {
  customDropdowns.forEach((dd) => dd.remove());
  customDropdowns = [];
  const uniqueCategories = formatMenuData(menuData);
  uniqueCategories.forEach((category) => {
    const customDropdownCon = document.createElement("div");
    customDropdownCon.category = category;
    customDropdownCon.classList =
      "w-full group px-3 flex items-center justify-start sm:justify-center md:justify-center lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer font-medium opacity-70 hover:opacity-100 py-2 md:py-2 _aca-dropdown-main";
    customDropdownCon.innerHTML = `
    <i style="text-align: center;position: relative;top: 2px;" class="fas fa-link md:mr-0 h-5 w-5 mr-2 lg:mr-2 xl:mr-2 text-white"></i>
    <span class="hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block text-white">${category}</span><span><i class="fas fa-chevron-right"></i></span>`;
    customDropdowns.push(customDropdownCon);
  });
  customDropdowns?.forEach((catCon, index) => {
    let currentCategoryData = menuData.filter(
      (d) => d.Category === catCon.category
    );
    const dropdownMain = document.createElement("div");
    dropdownMain.classList = `_aca-dropdown-container`;
    dropdownMain.dataset.index = "_aca-dropdown-container" + index;
    currentCategoryData?.forEach((el) => {
      const link = document.createElement("a");
      link.classList = `_aca-dropdown-link`;
      link.innerHTML = el.Name;
      link.href = el.Link;
      link.target = "_blank";
      dropdownMain.append(link);
    });
    catCon.append(dropdownMain);

    catCon.addEventListener("mouseenter", () => {
      dropdownMain.style.top = catCon.getBoundingClientRect().top + "px";
    });
  });

  return customDropdowns;
}
