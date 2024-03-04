export const get_scripts_from_sheet = async (sheet_url) => {
  const url = sheet_url;

  const options = {
    redirect: "follow",
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  };

  try {
    const reqest = await fetch(url, options);
    const script_data = await reqest.json();
    return script_data.data;
  } catch (error) {
    console.error(error);
  }
};
