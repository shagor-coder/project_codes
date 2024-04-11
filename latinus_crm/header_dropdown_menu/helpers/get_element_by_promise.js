export const get_element_by_promis = ({ selector, multiple }) => {
  let elements = null;
  let interval_id = null;

  return new Promise((resolve, reject) => {
    interval_id = setInterval(() => {
      elements = multiple
        ? [...document.querySelectorAll(selector)]
        : document.querySelector(selector);

      if (elements || (elements && elements.length))
        clearInterval(interval_id), resolve(elements);
    }, 200);

    setTimeout(() => {
      if (!elements || elements.length)
        resolve(null), clearInterval(interval_id);
    }, 10000);
  });
};
