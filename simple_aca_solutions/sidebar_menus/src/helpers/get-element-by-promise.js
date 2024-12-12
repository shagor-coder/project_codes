export const getElementByPromise = (selector = "") => {
  let interValId;
  let elements;
  let timeoutId;
  return new Promise((resolve, reject) => {
    interValId = setInterval(() => {
      elements = [...document.querySelectorAll(selector)];
      if (!elements.length) return;
      if (elements.length > 1) clearInterval(interValId), resolve(elements);
      if (elements.length > 0) clearInterval(interValId), resolve(elements[0]);
    }, 200);

    timeoutId = setTimeout(() => {
      clearInterval(interValId), resolve(null);
      clearTimeout(timeoutId);
    }, 5000);
  });
};
