export const get_auth_data_by_id = async (location_id, sheet_url) => {
  const url = sheet_url + "?sheet=0&action=lookup";

  const options = {
    redirect: "follow",
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify({ locationId: location_id }),
  };

  try {
    const reqest = await fetch(url, options);
    const auth_data = await reqest.json();
    return auth_data.data;
  } catch (error) {
    console.error(error);
  }
};
