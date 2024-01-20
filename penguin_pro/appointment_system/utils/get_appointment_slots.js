export const get_appointment_slots = async (calendar_id, access_token) => {
  const start_date_num = new Date().getTime();

  const url = `https://services.leadconnectorhq.com/calendars/${calendar_id}/free-slots?startDate=${start_date_num}&endDate=${
    start_date_num + 299592000
  }`;

  const options = {
    redirect: "follow",
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      Version: "2021-04-15",
      Accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
