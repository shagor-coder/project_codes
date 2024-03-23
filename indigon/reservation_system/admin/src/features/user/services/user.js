import { useQuery } from "@tanstack/react-query";
import {
  getAllUserForAdmin,
  getCurrentUser,
} from "../../../requests/user/user";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentuser"],
    queryFn: getCurrentUser,
    initialData: null,
    retry: 3,
  });
};

export const useGetAllUserForAdmin = () => {
  return useQuery({
    queryKey: ["allusers"],
    queryFn: getAllUserForAdmin,
    initialData: null,
    retry: 0,
  });
};
