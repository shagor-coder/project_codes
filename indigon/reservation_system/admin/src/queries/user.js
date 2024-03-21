import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUserForAdmin, getCurrentUser } from "../api/user/user";

export const useGetCurrentUser = () => {
  const queryClient = useQueryClient();

  const user = useQuery({
    queryKey: "currentuser",
    queryFn: getCurrentUser,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["currentuser"] });
    },
    retry: 3,
    onError: async (error) => {
      await queryClient.cancelQueries({ queryKey: ["currentuser"] });
      console.log(error.message);
    },
  });

  return user;
};

export const useGetAllUserForAdmin = () => {
  const queryClient = useQueryClient();

  const allusers = useQuery({
    queryKey: "allusers",
    queryFn: getAllUserForAdmin,
    onSuccess: async (data) => {
      console.log(data);
      await queryClient.cancelQueries({ queryKey: ["currentuser"] });
      queryClient.setQueryData({ queryKey: ["currentuser"] }, (old) => [
        ...old,
      ]);
    },
    retry: 3,
    onError: async (error) => {
      await queryClient.cancelQueries({ queryKey: ["currentuser"] });
      console.log(error.message);
    },
  });

  return allusers;
};
