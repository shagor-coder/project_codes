import axios from "axios";

export const getLocationAuthData = async (grant_type, type_str) => {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set("client_id", process.env.GHL_APP_MARKETPLACE_CLIENT_ID);
    encodedParams.set(
      "client_secret",
      process.env.GHL_APP_MARKETPLACE_CLIENT_SEC
    );
    encodedParams.set("grant_type", grant_type);
    encodedParams.set("code", type_str);

    const request = await axios.post(
      process.env.GHL_AUTH_POST_URL,
      encodedParams,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );
    const data = await request.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
