export const get_element_by_promise = (seletor, is_multi = false) => {
  let interval_id = null;
  let elements = null;

  return new Promise((resolve, reject) => {
    interval_id = setInterval(() => {
      is_multi
        ? (elements = [...document.querySelectorAll(seletor)])
        : (elements = document.querySelector(seletor));
      if (!elements) return;
      clearInterval(interval_id), resolve(elements);
    }, 200);

    setTimeout(() => {
      if (!elements) clearInterval(interval_id), reject(null);
    }, 10000);
  });
};
