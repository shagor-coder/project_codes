export const get_contact_by_id = async (id, access_token) => {
  const url = `https://services.leadconnectorhq.com/contacts/${id}`;
  const options = {
    redirect: "follow",
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      Version: "2021-07-28",
      Accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.contact;
  } catch (error) {
    console.error(error);
  }
};
