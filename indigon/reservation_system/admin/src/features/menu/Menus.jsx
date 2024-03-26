import { Backdrop, CircularProgress } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { useEffect } from "react";
import { ButtonModal } from "../../components/ButtonModal";
import { DataGridComponent } from "../../components/DataGrid";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import { AddMenuForm } from "./componetns/AddMenuForm";
import { EditMenuForm } from "./componetns/EditMenuForm";
import { useDeleteMenu, useGetAllMenus } from "./services/menu";

export const Menus = () => {
  const { dispatch } = UseAuthContext();
  const {
    data,
    isLoading,
    isError,
    error: menuGettingError,
  } = useGetAllMenus();
  const {
    isError: isDeleteError,
    data: deletedUser,
    error,
    mutate,
  } = useDeleteMenu();

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
        message: isError ? menuGettingError.message : error.message,
      });

    if (deletedUser)
      dispatch({
        type: "showToast",
        toastType: "success",
        message: "Menu deleted!",
      });
  }, [isError, isDeleteError, deletedUser]);

  const handleDeleteUser = (params) => {
    mutate(params.id);
  };

  if (data && data.length)
    content = (
      <DataGridComponent
        data={data}
        EditForm={EditMenuForm}
        handleDelete={handleDeleteUser}
        actionNeeded={true}
      />
    );

  return (
    <Layout headline="Menus">
      <PagesHeader
        headline="See all your Menus"
        IconButton={
          <ButtonModal
            modalHeadline="Create Menu"
            buttonIcon={<GridAddIcon />}
            modalForm={<AddMenuForm />}
          />
        }
      />
      {content}
    </Layout>
  );
};
