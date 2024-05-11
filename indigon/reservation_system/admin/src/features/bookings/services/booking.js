import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppQueryClient } from "../../../context/AuthContext";
import {
  createBooking,
  deleteCurrentBooking,
  getAllBookings,
  getCurrentBooking,
  updateBooking,
} from "../../../requests/booking/booking";

export const useGetCurrentBooking = ({ tableId }) => {
  return useQuery({
    queryKey: ["currentBooking"],
    queryFn: () => getCurrentBooking({ tableId }),
    retry: 0,
  });
};

export const useGetAllBooking = ({ locationId }) => {
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: () => getAllBookings({ locationId: locationId }),
    retry: 0,
  });
};

export const useCreateBooking = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["createBooking"],
    mutationFn: createBooking,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["createBooking"] });

      queryClient.setQueriesData(
        { queryKey: ["allBookings"] },
        (oldBookings) => {
          const previousBookings =
            oldBookings && oldBookings.length ? oldBookings : [];
          return [...previousBookings, data];
        }
      );
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useDeleteBooking = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["deleteBooking"],
    mutationFn: deleteCurrentBooking,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["deleteBooking"] });
      queryClient.setQueriesData(
        { queryKey: ["allBookings"] },
        (oldBookings) => {
          const updatedBookings = oldBookings.filter(
            (Booking) => Booking._id !== data.id
          );
          return updatedBookings;
        }
      );
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useEditBooking = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["updateBooking"],
    mutationFn: updateBooking,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["updateBooking"],
      });
      queryClient.setQueriesData({ queryKey: ["currentBooking"] }, () => {
        return data;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
