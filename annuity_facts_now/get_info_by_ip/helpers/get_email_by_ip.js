export default async function get_email_by_ip(ip) {
  try {
    const request_options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };
    const request = await fetch(
      `https://someapiendpoint.com/?ip=${ip}`,
      request_options
    );
    const response = await request.json();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
