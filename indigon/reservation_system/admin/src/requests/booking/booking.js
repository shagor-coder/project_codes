import { axiosInstance } from "../axios";

export const getCurrentBooking = async ({ bookingId }) => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/booking/${bookingId}/`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const deleteCurrentBooking = async ({ bookingId }) => {
  try {
    const request = await axiosInstance.delete(
      import.meta.env.VITE_API_BASE_URL + `/api/booking/${bookingId}`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getAllBookings = async ({ locationId }) => {
  try {
    const request = await axiosInstance.get(
      import.meta.env.VITE_API_BASE_URL + `/api/booking/${locationId}/all`
    );

    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const createBooking = async ({ locationId, formData }) => {
  try {
    const request = await axiosInstance.post(
      import.meta.env.VITE_API_BASE_URL + `/api/booking/${locationId}`,
      formData
    );
    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const updateBooking = async ({ bookingId, formData }) => {
  try {
    const request = await axiosInstance.put(
      import.meta.env.VITE_API_BASE_URL + `/api/booking/${bookingId}/update`,
      formData
    );
    const response = await request.data;
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
