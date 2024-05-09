import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserForAdmin,
  deleteCurrentUser,
  getAllUserForAdmin,
  getCurrentUser,
  updateCurrentUser,
} from "../../../requests/user/user";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentuser"],
    queryFn: getCurrentUser,
    retry: 0,
  });
};

export const useGetAllUserForAdmin = () => {
  return useQuery({
    queryKey: ["allusers"],
    queryFn: getAllUserForAdmin,
    retry: 0,
  });
};

export const useCreateUserForAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createuser"],
    mutationFn: createUserForAdmin,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["createuser"] });

      queryClient.setQueriesData({ queryKey: ["allusers"] }, (oldUsers) => {
        return [...oldUsers, data];
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteuser"],
    mutationFn: deleteCurrentUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["deleteuser"] });
      queryClient.setQueriesData({ queryKey: ["allusers"] }, (oldUsers) => {
        const updatedUsers = oldUsers.filter((user) => user._id !== data.id);
        return updatedUsers;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteuser"],
    mutationFn: updateCurrentUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["deleteuser"] });
      queryClient.setQueriesData({ queryKey: ["allusers"] }, (oldUsers) => {
        const updatedUsers = oldUsers.filter((user) => user._id !== data._id);
        return [data, ...updatedUsers];
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
