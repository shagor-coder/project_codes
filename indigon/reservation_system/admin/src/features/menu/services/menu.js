import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMenu,
  deleteCurrentMenu,
  getAllMenus,
  getCurrentMenu,
  updateMenu,
} from "../../../requests/menu/menu";

export const useGetCurrentMenu = (id) => {
  return useQuery({
    queryKey: ["currentMenu"],
    queryFn: () => getCurrentMenu(id),
    retry: 0,
  });
};

export const useGetAllMenus = () => {
  return useQuery({
    queryKey: ["allMenus"],
    queryFn: getAllMenus,
    retry: 0,
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMenu"],
    mutationFn: createMenu,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["createMenu"] });
      queryClient.setQueriesData({ queryKey: ["allMenus"] }, (oldMenus) => {
        const isPreviousMenu = oldMenus && oldMenus.length ? oldMenus : [];
        return [...isPreviousMenu, data];
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteMenu"],
    mutationFn: deleteCurrentMenu,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["deleteMenu"] });
      queryClient.setQueriesData({ queryKey: ["allMenus"] }, (oldMenus) => {
        const updatedMenus = oldMenus.filter((menu) => menu._id !== data.id);
        return updatedMenus;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useEditMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateMenu"],
    mutationFn: updateMenu,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["updateMenu"] });
      queryClient.setQueriesData({ queryKey: ["allMenus"] }, (oldMenus) => {
        const updatedMenus = oldMenus.filter((menu) => menu._id !== data._id);
        updatedMenus.push(data);
        return updatedMenus;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
