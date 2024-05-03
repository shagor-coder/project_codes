export const capitalizeText = (text) => {
  let capitalizedText = text.replace(/(^|[.!?]\s+)(\w)/g, function (match) {
    return match.toUpperCase();
  });

  return capitalizedText;
};
