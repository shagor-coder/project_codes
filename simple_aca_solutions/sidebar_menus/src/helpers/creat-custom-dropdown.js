export const customDropdownCon = document.createElement("div");
customDropdownCon.classList =
  "w-full group px-3 flex items-center justify-start sm:justify-center md:justify-center lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer font-medium opacity-70 hover:opacity-100 py-2 md:py-2 _aca-dropdown-main";
customDropdownCon.innerHTML = `
    <i style="text-align: center;position: relative;top: 2px;" class="fab fa-amilia md:mr-0 h-5 w-5 mr-2 lg:mr-2 xl:mr-2 text-white"></i>
    <span class="hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block text-white">ACA Info</span><span><i class="fas fa-chevron-right"></i></span>`;

export const dropdownMain = document.createElement("div");
dropdownMain.classList = `_aca-dropdown-container`;
export const createCustomDropdown = (elements = []) => {
  dropdownMain.innerHTML = "";
  elements.forEach((el) => {
    const link = document.createElement("a");
    link.classList = `_aca-dropdown-link`;
    link.innerHTML = el.name;
    link.href = el.link;

    link.target = "_blank";

    dropdownMain.append(link);
  });
};
