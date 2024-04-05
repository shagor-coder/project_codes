import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppQueryClient } from "../../../context/AuthContext";
import {
  createRestuarant,
  deleteCurrentRestuarant,
  getAllRestuarants,
  getCurrentRestuarant,
  updateRestuarant,
} from "../../../requests/restaurant/restaurant";

export const useGetCurrentRestaurant = ({ restaurantId }) => {
  return useQuery({
    queryKey: ["currentRestaurant"],
    queryFn: () => getCurrentRestuarant({ restaurantId }),
    retry: 0,
  });
};

export const useGetAllRestaurant = (locationId) => {
  return useQuery({
    queryKey: ["allRestaurants"],
    queryFn: () => getAllRestuarants(locationId),
    retry: 0,
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["createRestaurant"],
    mutationFn: createRestuarant,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["createRestaurant"] });

      queryClient.setQueriesData(
        { queryKey: ["allRestaurants"] },
        (oldRestaurants) => {
          const previousRestaurants =
            oldRestaurants && oldRestaurants.length ? oldRestaurants : [];
          return [...previousRestaurants, data];
        }
      );
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["deleteRestaurant"],
    mutationFn: deleteCurrentRestuarant,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["deleteRestaurant"] });
      queryClient.setQueriesData(
        { queryKey: ["allRestaurants"] },
        (oldRestaurants) => {
          const updatedRestaurants = oldRestaurants.filter(
            (restaurant) => restaurant._id !== data.id
          );
          return updatedRestaurants;
        }
      );
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useEditRestaurant = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["updateRestaurant"],
    mutationFn: updateRestuarant,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["upadateRestaurant"] });
      queryClient.setQueriesData(
        { queryKey: ["allRestaurants"] },
        (oldRestaurants) => {
          const updatedRestaurants = oldRestaurants.filter(
            (restaurant) => restaurant._id !== data._id
          );
          updatedRestaurants.push(data);
          return updatedRestaurants;
        }
      );
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
