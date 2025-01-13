import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppQueryClient } from "../../../context/AuthContext";
import {
  createRestaurant,
  deleteCurrentRestaurant,
  getAllRestaurants,
  getCurrentRestaurant,
  updateRestaurant,
  deleteRestaurantImage,
  deleteRestaurantFeaturedImage,
} from "../../../requests/restaurant/restaurant";

export const useGetCurrentRestaurant = ({ restaurantId }) => {
  return useQuery({
    queryKey: ["currentRestaurant"],
    queryFn: () => getCurrentRestaurant({ restaurantId }),
    retry: 0,
  });
};

export const useGetAllRestaurant = (locationId) => {
  return useQuery({
    queryKey: ["allRestaurants"],
    queryFn: () => getAllRestaurants(locationId),
    retry: 0,
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["createRestaurant"],
    mutationFn: createRestaurant,
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
    mutationFn: deleteCurrentRestaurant,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["deleteRestaurant"] });
      queryClient.setQueriesData(
        { queryKey: ["allRestaurants"] },
        (oldRestaurants) => {
          const updatedRestaurants = oldRestaurants.filter(
            (restaurant) => restaurant.id !== data.id
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
    mutationFn: updateRestaurant,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["updateRestaurant"],
      });
      queryClient.setQueriesData({ queryKey: ["currentRestaurant"] }, () => {
        return data;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useDeleteRestaurantImage = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["deleteRestaurantImage"],
    mutationFn: deleteRestaurantImage,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["deleteRestaurantImage"],
      });
      queryClient.setQueriesData({ queryKey: ["currentRestaurant"] }, () => {
        return data;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useDeleteRestaurantFeaturedImage = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["deleteRestaurantFeaturedImage"],
    mutationFn: deleteRestaurantFeaturedImage,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["deleteRestaurantFeaturedImage"],
      });
      queryClient.setQueriesData({ queryKey: ["currentRestaurant"] }, () => {
        return data;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
