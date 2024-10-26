let mutationObserver = null;

const getElementByPromise = (selector) => {
  return new Promise((resolve, reject) => {
    let intervalId = null;
    let element = null;

    intervalId = setInterval(() => {
      element = document.querySelector(selector);
      if (!element) return;
      clearInterval(intervalId);
      resolve(element);
    }, 200);

    setTimeout(() => {
      clearInterval(intervalId);
      reject(null);
    }, 10000);
  });
};

const mutationCallbackHandler = () => {
  return async () => {
    const bpContainer = await getElementByPromise(".c-order .form-btn");
    if (!bpContainer) return;
    const infoElement = await getElementByPromise(".form-body .info");
    if (!infoElement) return;
    bpContainer.parentElement.insertBefore(infoElement, bpContainer);
    mutationObserver.disconnect();
  };
};

const mainFn = () => {
  const app = document.querySelector("#__nuxt");
  mutationObserver = new MutationObserver(mutationCallbackHandler());
  mutationObserver.observe(app, {
    childList: true,
    attributes: true,
    subtree: true,
  });
};

mainFn();
