import { handleMenuInsert } from "./helpers/handleMenuInsert";
import styleSheet from "./style.css?inline=true";

const styleTag = document.createElement("style");
styleTag.type = "text/css";
styleTag.innerHTML = styleSheet;

document.head.appendChild(styleTag);

let prevLocation;

function handleDomInsert() {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const currentURL = new URL(location.href);
      if (!currentURL.pathname.includes("location"))
        return console.log("agency client"), (window.menuInserted = false);

      if (currentURL.pathname.includes("/settings/"))
        return console.log("setting client"), (window.menuInserted = false);

      if (currentURL.pathname.includes("/workflow/"))
        return (window.menuInserted = false);

      if (currentURL.pathname.includes("/form-builder-v2/"))
        return (window.menuInserted = false);

      if (currentURL.pathname.includes("/survey-builder-v2/"))
        return (window.menuInserted = false);

      if (currentURL.pathname.includes("/page-builder/"))
        return (window.menuInserted = false);

      if (currentURL.pathname.includes("/emails/create/"))
        return (window.menuInserted = false);

      if (currentURL.pathname.includes("/campaigns/create"))
        return (window.menuInserted = false);

      if (window.menuInserted)
        return console.log(window.menuInserted, "From Main");

      if (prevLocation === currentURL.pathname && window.menuInserted) return;
      await handleMenuInsert(currentURL.pathname);
      prevLocation = currentURL.pathname;
      console.log("FN called!!");
    }, 500);
  };
}

const sidebar = document.querySelector("#app");
sidebar.addEventListener("DOMNodeInserted", handleDomInsert());
