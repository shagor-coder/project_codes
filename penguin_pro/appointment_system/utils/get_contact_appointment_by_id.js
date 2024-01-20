export const get_contact_appointment_by_id = async (id, access_token) => {
  const url = `https://services.leadconnectorhq.com/contacts/${id}/appointments`;
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
    return data.events[0];
  } catch (error) {
    console.error(error);
  }
};
