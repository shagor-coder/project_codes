import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { Sidebar } from "../../components/Sidebar";
import { PagesHeader } from "../../components/PagesHeader";
import { DataGridComponent } from "../../components/DataGrid";
import { ButtonModal } from "../../components/ButtonModal";
import { GridAddIcon } from "@mui/x-data-grid";
import { AddUserForm } from "./componetns/AddUserForm";
import { UseAuthContext } from "../../context/AuthContext";
import { useDeleteUser, useGetAllUserForAdmin } from "./services/user";
import { useEffect } from "react";
import { EditUserForm } from "./componetns/EditUserForm";

export const Users = () => {
  const { dispatch } = UseAuthContext();
  const { data, isLoading, isError } = useGetAllUserForAdmin();
  const {
    isError: isDeleteError,
    data: deletedUser,
    error,
    mutate,
  } = useDeleteUser();

  let content = "";

  if (isLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  useEffect(() => {
    if (isError || isDeleteError)
      dispatch({
        type: "showToast",
        toastType: "error",
        message: isError ? "Failed to load user" : error.message,
      });

    if (deletedUser)
      dispatch({
        type: "showToast",
        toastType: "success",
        message: "User deleted!",
      });
  }, [isError, isDeleteError, deletedUser]);

  const handleDeleteUser = (params) => {
    mutate(params.id);
  };

  if (data)
    content = (
      <DataGridComponent
        data={data}
        EditForm={EditUserForm}
        handleDelete={handleDeleteUser}
      />
    );

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar headline="Users" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <PagesHeader
          headline="See all your users"
          IconButton={
            <ButtonModal
              modalHeadline="Add a user"
              buttonIcon={<GridAddIcon />}
              modalForm={<AddUserForm />}
            />
          }
        />
        {content}
      </Box>
    </Box>
  );
};
