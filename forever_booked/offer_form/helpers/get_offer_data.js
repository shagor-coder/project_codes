export const get_offer_data = async () => {
  try {
    const sheet_url =
      "https://script.google.com/macros/s/AKfycbwfoZ-454wVR4vyk0VNg6OYI2ot9TROJ0dQyaPjzVy2zKy-wGfgA-h7OmYM2kALTgnY/exec?sheet=0";

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
