import {
  addAddressAutomComplete,
  automCompleteSpan,
} from "./helpers/add-address-autocomplete";
import { appConfig } from "./helpers/app.config";

const handleMutation = (timeout) => {
  let timeOutId = null;
  return () => {
    if (automCompleteSpan.isConnected) return;

    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      const currentURL = new URL(location.href);
      const pathname = currentURL.pathname;

      if (!pathname.includes("location")) return;
      if (!pathname.includes("/contacts/detail/")) return;
      const paths = pathname.split("/");
      const locationId = paths[3];
      if (!appConfig.includedLocations.includes(locationId.trim())) return;
      addAddressAutomComplete();
    }, timeout);
  };
};

const mainFn = () => {
  const app = document.querySelector("#app");
  const mutationObeserver = new MutationObserver(handleMutation(500));
  mutationObeserver.observe(app, {
    childList: true,
    subtree: true,
    attributes: true,
  });
};
mainFn();
