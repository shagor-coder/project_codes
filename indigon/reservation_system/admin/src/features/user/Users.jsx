import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { Sidebar } from "../../components/Sidebar";
import { PagesHeader } from "../../components/PagesHeader";
import { DataGridComponent } from "../../components/DataGrid";
import { ButtonModal } from "../../components/ButtonModal";
import { GridAddIcon } from "@mui/x-data-grid";
import { AddUserForm } from "./componetns/AddUserForm";
import { UseAuthContext } from "../../context/AuthContext";
import { useGetAllUserForAdmin } from "./services/user";
import { useEffect } from "react";

export const Users = () => {
  const { dispatch } = UseAuthContext();
  const { data, isLoading, isError } = useGetAllUserForAdmin();

  let content = "";

  if (isLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  useEffect(() => {
    if (isError)
      dispatch({
        type: "showToast",
        toastType: "error",
        message: "Failed to load users!",
      });
  }, [isError]);

  if (data) content = <DataGridComponent data={data[0].users} />;

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
