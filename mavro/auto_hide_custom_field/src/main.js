import { handleContactDetails } from "./helpers/handle-contact-detail";

const handleMutation = (timeout) => {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const currentURL = new URL(location.href);
      if (!currentURL.pathname.includes("location")) return;
      if (!currentURL.pathname.includes("/contacts/detail")) return;
      handleContactDetails();
      clearTimeout(timeoutId);
    }, timeout);
  };
};

const mutationObserver = new MutationObserver(handleMutation(500));

const mainFn = () => {
  const app = document.querySelector("#app");
  mutationObserver.observe(app, {
    attributes: false,
    childList: true,
    subtree: true,
  });
};

mainFn();
