import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLocation,
  deleteCurrentLocation,
  getAllLocations,
  getCurrentLocation,
} from "../../../requests/location/location";

export const useGetCurrentLocation = (id) => {
  return useQuery({
    queryKey: ["currentLocation"],
    queryFn: () => getCurrentLocation(id),
    retry: 0,
  });
};

export const useGetAllLocations = () => {
  return useQuery({
    queryKey: ["allLocations"],
    queryFn: getAllLocations,
    retry: 0,
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createLocation"],
    mutationFn: createLocation,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["createLocation"] });

      queryClient.setQueriesData(
        { queryKey: ["allLocations"] },
        (oldLocations) => {
          return [...oldLocations, data];
        }
      );
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteLocation"],
    mutationFn: deleteCurrentLocation,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["deleteLocation"] });
      queryClient.setQueriesData(
        { queryKey: ["allLocations"] },
        (oldLocations) => {
          const updatedLocations = oldLocations.filter(
            (Location) => Location._id !== data.id
          );
          return updatedLocations;
        }
      );
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
