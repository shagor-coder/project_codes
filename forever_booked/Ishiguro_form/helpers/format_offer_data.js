export const format_offer_data = (data = []) => {
  const offer_categories = data.map((d) => d.Offer_Category);
  const offer_categories_array = [...new Set(offer_categories)];

  let offer_names = [];

  offer_categories_array.forEach((oca) => {
    const on = data.filter(
      (d) => d.Offer_Category.toLowerCase() === oca.toLowerCase()
    );

    offer_names.push(on);
  });

  return { offer_names, offer_categories_array };
};
