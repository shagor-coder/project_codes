import { axiosInstance } from "../axios";

export const getCurrentLocation = async (id) => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/location/${id}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const deleteCurrentLocation = async (id) => {
  try {
    const request = await axiosInstance.delete(
      import.meta.env.VITE_API_BASE_URL + `/api/Location/${id}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getAllLocations = async () => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/Location/all`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const createLocation = async (code) => {
  try {
    const request = await axiosInstance.post(
      import.meta.env.VITE_API_BASE_URL + `/api/location?code=${code}`,
      {}
    );
    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
