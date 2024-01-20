export const update_contact_appointment = async (event_id, access_token) => {
  const url = `https://services.leadconnectorhq.com/calendars/events/appointments/${event_id}`;
  const options = {
    redirect: "follow",
    method: "PUT",
    headers: {
      Authorization: `Bearer ${access_token}`,
      Version: "2021-04-15",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
