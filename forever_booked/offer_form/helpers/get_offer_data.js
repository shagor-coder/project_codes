export const get_offer_data = async () => {
  try {
    const sheet_url =
      "https://script.google.com/macros/s/AKfycbxuI8W0DmS0cznJy5uhS2xHmBQ5iwWofRq1VkLDnGJeyRBIH33f3xWUPsYAsWjF5Q-xSw/exec?sheet=0";

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
