export const select_dom_element = (selector_name = "", type = "") => {
  return new Promise((res, rej) => {
    let element = null;
    let timeout;
    timeout = setInterval(() => {
      if (type === "multi") {
        element = [...document.querySelectorAll(selector_name)];
      } else {
        element = document.querySelector(selector_name);
      }

      if (!element) return;
      clearInterval(timeout);
      res(element);
    }, 300);

    setTimeout(() => {
      if (!element) {
        clearInterval(timeout);
        res(false);
      }
    }, 10000);
  });
};
