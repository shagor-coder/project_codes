export const update_auth_data_in_sheet = async (body, sheet_url) => {
  const url = sheet_url + "?sheet=0&action=update";

  const options = {
    redirect: "follow",
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(body),
  };

  try {
    const reqest = await fetch(url, options);
    const auth_data = await reqest.json();
    return auth_data.data;
  } catch (error) {
    console.error(error);
  }
};
