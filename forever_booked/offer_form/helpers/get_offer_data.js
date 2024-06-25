export const get_offer_data = async () => {
  try {
    const sheet_url = "{{ custom_values.sheets_url }}?sheet=0";

    const request_options = {
      redirect: "follow",
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    };
    const request = await fetch(sheet_url, request_options);
    const response = await request.json();
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
