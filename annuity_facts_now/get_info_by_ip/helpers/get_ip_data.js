import { ip_api_key } from "./api_key";

export default async function get_ip_data() {
  const baseURL = `https://api.ipdata.co/?api-key=${ip_api_key.trim()}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  try {
    const request = await fetch(baseURL, config);
    const response = await request.json();
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
