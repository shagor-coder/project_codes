import { opportunityButton } from "./helpers/create-button";
import { insertOportunityButton } from "./helpers/insert-opportunity-button";

const handleMutation = (timeout) => {
  let timeoutId;
  return () => {
    if (opportunityButton.isConnected) return;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const currentURL = new URL(location.href);
      if (!currentURL.pathname.includes("location")) return;
      if (currentURL.pathname.includes("/contacts/detail")) {
        insertOportunityButton("contact");
        clearTimeout(timeoutId);
      }
      if (currentURL.pathname.includes("/conversations/conversations/")) {
        insertOportunityButton("conversations");
        clearTimeout(timeoutId);
      }
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
