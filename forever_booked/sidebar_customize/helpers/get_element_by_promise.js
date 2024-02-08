export const get_element_by_promise = (selectorClass = "", type = "") => {
  return new Promise((res, rej) => {
    let element = [];
    let timeout;
    timeout = setInterval(() => {
      if (type === "multi") {
        element = [...document.querySelectorAll(selectorClass)];
      } else {
        element = document.querySelector(selectorClass);
      }

      if (!element || !element.length) return;
      clearInterval(timeout);
      res(element);
    }, 300);

    setTimeout(() => {
      if (!element) {
        clearInterval(timeout);
        res(false);
      }
    }, 20000);
  });
};
