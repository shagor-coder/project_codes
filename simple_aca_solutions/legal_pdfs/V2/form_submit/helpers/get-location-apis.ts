import axios from "axios";
import { URLSearchParams } from "url";

export const getAccessTokenByCode = async (
  code: string,
  clientId: string,
  clientSecret: string
) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("client_id", clientId);
  encodedParams.set("client_secret", clientSecret);
  encodedParams.set("grant_type", "authorization_code");
  encodedParams.set("code", code);

  const options = {
    method: "POST",
    url: "https://services.leadconnectorhq.com/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    data: encodedParams,
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getAccessTokenByRefresh = async (
  refreshToken: string,
  clientId: string,
  clientSecret: string
) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("client_id", clientId);
  encodedParams.set("client_secret", clientSecret);
  encodedParams.set("grant_type", "refresh_token");
  encodedParams.set("refresh_token", refreshToken);

  const options = {
    method: "POST",
    url: "https://services.leadconnectorhq.com/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    data: encodedParams,
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getLocationAccessTokenByAgencyToken = async (
  accessToken: string,
  locationId: string,
  companyId: string
) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("locationId", locationId);
  encodedParams.set("companyId", companyId);

  const options = {
    method: "POST",
    url: "https://services.leadconnectorhq.com/oauth/locationToken",
    headers: {
      Version: "2021-07-28",
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: encodedParams,
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getLocationsByAgencyToken = async (accessToken: string) => {
  const options = {
    method: "GET",
    url: "https://services.leadconnectorhq.com/locations/search",
    params: { limit: "300" },
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Version: "2021-07-28",
      Accept: "application/json",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data.locations || [];
  } catch (error: any) {
    throw error;
  }
};

export const getLocationByAgencyToken = async (
  accessToken: string,
  locationId: string
) => {
  const options = {
    method: "GET",
    url: `https://services.leadconnectorhq.com/locations/${locationId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Version: "2021-07-28",
      Accept: "application/json",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data.location || null;
  } catch (error: any) {
    throw error;
  }
};
