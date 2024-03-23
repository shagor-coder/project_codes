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

export const handleTokenValidation = async () => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + "/auth/validate/token"
    );
    const response = await request.data;
    return response?.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
