function select_element_by_promise(selectorClass = "", type = "") {
  return new Promise((res, rej) => {
    let element = null;
    let intervalId = null;
    let timeoutId = null;
    intervalId = setInterval(() => {
      if (type === "multi") {
        element = [...document.querySelectorAll(selectorClass)];
      } else {
        element = document.querySelector(selectorClass);
      }

      if (type === "multi" && !element.length) return;
      if (!element) return;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      res(element);
    }, 200);

   timeoutId = setTimeout(() => {
      if (!element) {
        clearTimeout(timeoutId)
        clearInterval(intervalId);
        res(false);
      }
    }, 20000);
  });
}

export default select_element_by_promise;
