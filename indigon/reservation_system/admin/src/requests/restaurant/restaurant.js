import axios from "axios";
import { axiosInstance } from "../axios";

export const getCurrentRestuarant = async ({ locationId, restaurantId }) => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL +
        `/api/restuarant/${locationId}/${restaurantId}/`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const deleteCurrentRestuarant = async ({ locationId, restaurantId }) => {
  try {
    const request = await axiosInstance.delete(
      import.meta.env.VITE_API_BASE_URL +
        `/api/restuarant/${locationId}/${restaurantId}}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getAllRestuarants = async (locationId) => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/restuarant/${locationId}/all`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const createRestuarant = async ({ locationId, formData }) => {
  try {
    const request = await axios.post(
      import.meta.env.VITE_API_BASE_URL + `/api/restuarant/${locationId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const response = await request.data;
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data);
  }
};

export const updateRestuarant = async ({
  locationId,
  restaurantId,
  formData,
}) => {
  try {
    const request = await axiosInstance.post(
      import.meta.env.VITE_API_BASE_URL +
        `/api/restuarant/${locationId}/${restaurantId}`,
      formData
    );
    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
