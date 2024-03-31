export const get_element_by_prmise = ({ class_name, is_multiple }) => {
  let elements = null;
  let timeout_id = null;
  return new Promise((resolve, reject) => {
    timeout_id = setInterval(() => {
      elements = is_multiple
        ? document.querySelectorAll(class_name)
        : document.querySelector(class_name);
      if (elements.length) {
        clearInterval(timeout_id);
        resolve([...elements]);
      }

      if (elements) {
        clearInterval(timeout_id);
        resolve(elements);
      }
    }, 200);
    setTimeout(() => {
      clearInterval(timeout_id);
      reject(null);
    }, 10000);
  });
};
