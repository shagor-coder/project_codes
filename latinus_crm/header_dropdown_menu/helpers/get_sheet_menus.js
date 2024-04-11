export const get_sheet_menus = async () => {
  try {
    const options = {
      redirect: "follow",
      method: "GET",
      heders: {
        "Content-Type": "text/plain",
      },
    };

    const request = await fetch(
      "https://script.google.com/macros/s/AKfycbwk3i5ol1cutNi-qqhS8NLOm3m-zNO9viaM-MS75AWUpuU4dXOlD96DTO-4pZ-azO6P/exec?sheet=0",
      options
    );
    const response = await request.json();
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
