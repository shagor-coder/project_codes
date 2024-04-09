import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppQueryClient } from "../../../context/AuthContext";
import {
  createTable,
  deleteCurrentTable,
  getAllTables,
  getCurrentTable,
  updateTable,
} from "../../../requests/table/table";

export const useGetCurrentTable = ({ tableId }) => {
  return useQuery({
    queryKey: ["currentTable"],
    queryFn: () => getCurrentTable({ tableId }),
    retry: 0,
  });
};

export const useGetAllTable = ({ restaurantId }) => {
  return useQuery({
    queryKey: ["allTables"],
    queryFn: () => getAllTables({ restaurantId: restaurantId }),
    retry: 0,
  });
};

export const useCreateTable = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["createTable"],
    mutationFn: createTable,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["createTable"] });

      queryClient.setQueriesData({ queryKey: ["allTables"] }, (oldTables) => {
        const previousTables = oldTables && oldTables.length ? oldTables : [];
        return [...previousTables, data];
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useDeleteTable = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["deleteTable"],
    mutationFn: deleteCurrentTable,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["deleteTable"] });
      queryClient.setQueriesData({ queryKey: ["allTables"] }, (oldTables) => {
        const updatedTables = oldTables.filter(
          (Table) => Table._id !== data.id
        );
        return updatedTables;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};

export const useEditTable = () => {
  const queryClient = useAppQueryClient();

  return useMutation({
    mutationKey: ["updateTable"],
    mutationFn: updateTable,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["updateTable"],
      });
      queryClient.setQueriesData({ queryKey: ["currentTable"] }, () => {
        return data;
      });
    },
    onError: async (error) => {
      console.log(error);
    },
    retry: 0,
  });
};
