import axios from "axios";
import { axiosInstance } from "../axios";

export const getCurrentRestaurant = async ({ restaurantId }) => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/restaurant/${restaurantId}/`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const deleteCurrentRestaurant = async ({ restaurantId }) => {
  try {
    const request = await axiosInstance.delete(
      import.meta.env.VITE_API_BASE_URL + `/api/restaurant/${restaurantId}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getAllRestaurants = async (locationId) => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/restaurant/${locationId}/all`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const createRestaurant = async ({ locationId, formData }) => {
  try {
    const request = await axios.post(
      import.meta.env.VITE_API_BASE_URL + `/api/restaurant/${locationId}`,
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
    throw error.response?.data;
  }
};

export const updateRestaurant = async ({ restaurantId, formData }) => {
  try {
    const request = await axiosInstance.put(
      import.meta.env.VITE_API_BASE_URL +
        `/api/restaurant/${restaurantId}/update`,
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
    throw error.response?.data;
  }
};

export const deleteRestaurantImage = async ({ restaurantId, photoId, id }) => {
  try {
    const request = await axiosInstance.delete(
      import.meta.env.VITE_API_BASE_URL +
        `/api/restaurant/${restaurantId}/deleteImage?photoId=${photoId}&id=${id}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const deleteRestaurantFeaturedImage = async ({
  restaurantId,
  photoId,
}) => {
  try {
    const request = await axiosInstance.delete(
      import.meta.env.VITE_API_BASE_URL +
        `/api/restaurant/${restaurantId}/deleteFeaturedImage?photoId=${photoId}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
