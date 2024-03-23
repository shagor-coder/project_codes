import { axiosInstance } from "../axios";

export const getCurrentUser = async () => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/user/`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const updateCurrentUser = async ({ id, formData }) => {
  try {
    const request = await axiosInstance.put(
      import.meta.env.VITE_API_BASE_URL + `/api/user/${id}`,
      formData
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const deleteCurrentUser = async (id) => {
  try {
    const request = await axiosInstance.delete(
      import.meta.env.VITE_API_BASE_URL + `/api/user/${id}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getAllUserForAdmin = async () => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/user/all`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const createUserForAdmin = async (formData) => {
  try {
    const request = await axiosInstance.post(
      import.meta.env.VITE_API_BASE_URL + `/api/user/`,
      formData
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
