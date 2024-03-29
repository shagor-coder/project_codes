import { Backdrop, CircularProgress } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { useEffect } from "react";
import { ButtonModal } from "../../components/ButtonModal";
import { DataGridComponent } from "../../components/DataGrid";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import { AddUserForm } from "./componetns/AddUserForm";
import { EditUserForm } from "./componetns/EditUserForm";
import { useDeleteUser, useGetAllUserForAdmin } from "./services/user";

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

  if (data && data.length)
    content = (
      <DataGridComponent
        data={data}
        EditForm={EditUserForm}
        handleDelete={handleDeleteUser}
        actionNeeded={true}
      />
    );

  return (
    <Layout headline="Users">
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
    </Layout>
  );
};
