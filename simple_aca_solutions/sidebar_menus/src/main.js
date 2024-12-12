import { customDropdownCon } from "./helpers/creat-custom-dropdown";
import { handleMenuInsert } from "./helpers/handle-menu-insert";
import styles from "./style.css?inline=true";

const styleTag = document.createElement("style");
styleTag.type = "text/css";
styleTag.innerHTML = styles;

document.head.appendChild(styleTag);

const handleMutation = () => {
  let timeout;
  return () => {
    if (customDropdownCon.isConnected) return;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const currentURL = new URL(location.href);
      if (!currentURL.pathname.includes("location")) return;
      if (currentURL.pathname.includes("/settings/")) return;
      if (currentURL.pathname.includes("/workflow/")) return;
      if (currentURL.pathname.includes("/form-builder-v2/")) return;
      if (currentURL.pathname.includes("/survey-builder-v2/")) return;
      if (currentURL.pathname.includes("/page-builder/")) return;
      if (currentURL.pathname.includes("/emails/create/")) return;
      if (currentURL.pathname.includes("/campaigns/create")) return;
      handleMenuInsert(currentURL.pathname);
      clearTimeout(timeout);
    }, 100);
  };
};
const mutationObserver = new MutationObserver(handleMutation());
const mainFn = () => {
  const app = document.querySelector("#app");
  mutationObserver.observe(app, {
    childList: true,
    subtree: true,
    attributes: true,
  });
};

mainFn();
