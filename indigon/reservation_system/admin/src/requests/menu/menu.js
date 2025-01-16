import { axiosInstance } from "../axios";

export const getCurrentMenu = async (id) => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/menu/${id}`
    );
    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const deleteCurrentMenu = async (id) => {
  try {
    const request = await axiosInstance.delete(
      import.meta.env.VITE_API_BASE_URL + `/api/Menu/${id}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getAllMenus = async () => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/menu/all`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const createMenu = async (formData) => {
  try {
    const request = await axiosInstance.post(
      import.meta.env.VITE_API_BASE_URL + `/api/menu/`,
      formData
    );
    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const updateMenu = async ({ id, formData }) => {
  try {
    const request = await axiosInstance.put(
      import.meta.env.VITE_API_BASE_URL + `/api/menu/${id}`,
      formData
    );
    const response = await request.data;
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
