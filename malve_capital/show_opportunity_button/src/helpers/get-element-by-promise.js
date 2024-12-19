export const getElementsByPromise = (selector, isMulti) => {
  let timeoutId;
  let intervalId;
  let elements;
  return new Promise((resolve, reject) => {
    intervalId = setInterval(() => {
      elements = document.querySelectorAll(selector);
      if (!elements.length) return;
      if (elements.length && isMulti)
        clearInterval(intervalId), resolve([...elements]);
      if (elements.length && !isMulti)
        clearInterval(intervalId), resolve(elements[0]);
    }, 200);

    intervalId = setTimeout(() => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      resolve(null);
    }, 10000);
  });
};
