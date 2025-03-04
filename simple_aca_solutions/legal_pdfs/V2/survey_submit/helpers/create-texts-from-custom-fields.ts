interface customFieldsType {
  name: string;
  email: string;
}

export const createTextsFromCustomFields = (customFields: customFieldsType) => {
  const customFieldsKey = Object.keys(customFields);
  const texts = customFieldsKey.map((field: string) => {
    let ques = `Q. ${field} \n`;
    let ans = `A. ${customFields[field as keyof customFieldsType]} \n`;

    return ques + ans;
  });

  return texts.join("");
};
