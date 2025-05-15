import axios from "axios";

export const updateContactById = async (
  access_token: string,
  contactId: string,
  fielKey: string,
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
          key: fielKey,
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
