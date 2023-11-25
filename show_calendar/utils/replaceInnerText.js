function replaceInnerText(elementArray = [], obj = {}, replace = "") {
  elementArray.forEach((element) => {
    element.innerHTML = element.innerHTML.replace(/\[(.*?)\]/g, (match, p1) => {
      const key = p1.trim().replace(replace, "");
      console.log(key, obj[key]);
      if (obj.hasOwnProperty(key)) {
        return obj[key];
      }
      return match;
    });
    element.style.display = "block";
  });
}

export default replaceInnerText;
