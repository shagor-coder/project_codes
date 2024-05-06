export default async function get_info_by_email(email) {
  const request_url = `https://api.atdata.com/v5/eppend?email=${email.trim()}&api_key=${""}`;

  try {
    let request_options = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      redirect: "follow",
    };
    const request = await fetch(request_url, request_options);
    const response = await request.json();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
