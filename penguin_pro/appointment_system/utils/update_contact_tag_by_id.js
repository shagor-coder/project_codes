export const update_contact_tag_by_id = async (id, access_token, tag) => {
  const url = `https://services.leadconnectorhq.com/contacts/${id}/tags`;
  const options = {
    redirect: "follow",
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: `{"tags":["${tag}"]}`,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
