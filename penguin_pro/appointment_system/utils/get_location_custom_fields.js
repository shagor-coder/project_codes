export const get_location_custom_fields = async (access_token, location_id) => {
  const url = `https://services.leadconnectorhq.com/locations/${location_id}/customFields`;
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
    return data.customFields;
  } catch (error) {
    console.error(error);
  }
};
