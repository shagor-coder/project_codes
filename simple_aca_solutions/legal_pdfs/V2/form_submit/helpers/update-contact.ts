import axios from "axios";

export const updateContactById = async (
  access_token: string,
  contactId: string,
  fieldId: string,
  uploadedURL: string
) => {
  const options = {
    method: "PUT",
    url: `https://services.leadconnectorhq.com/contacts/${contactId}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      customFields: [
        {
          key: "who_referred_you_to_us",
          field_value: uploadedURL.toString(),
        },
      ],
    },
  };

  try {
    const { data } = await axios.request(options);
    return data.contact;
  } catch (error) {
    throw error;
  }
};
