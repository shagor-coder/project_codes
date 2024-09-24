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

      if (type === "multi" && element.length < 24) return;
      if (type === "single" && !element) return;
      clearInterval(timeout);
      res(element);
    }, 200);

    setTimeout(() => {
      if (!element) {
        clearInterval(timeout);
        res(false);
      }
    }, 30000);
  });
};
