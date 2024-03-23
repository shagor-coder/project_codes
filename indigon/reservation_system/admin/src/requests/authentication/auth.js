import { axiosInstance } from "../axios";

export const handleLogin = async (formData = {}) => {
  try {
    const request = await axiosInstance.post(
      import.meta.env.VITE_API_BASE_URL + "/auth/login",
      formData
    );

    const response = await request.data;
    return response?.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const handleRegister = async (formData = {}) => {
  try {
    const request = await axiosInstance.post(
      import.meta.env.VITE_API_BASE_URL + "/auth/register",
      formData
    );

    const response = await request.data;
    return response?.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const handleLogout = async () => {
  try {
    const request = await axiosInstance.post(
      import.meta.env.VITE_API_BASE_URL + "/auth/logout",
      {}
    );
    return request;
  } catch (error) {
    console.log(error);
    throw new Error(error?.response?.data);
  }
};
