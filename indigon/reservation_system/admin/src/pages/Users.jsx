import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { PagesHeader } from "../components/PagesHeader";
import { DataGridComponent } from "../components/DataGrid";
import { ButtonModal } from "../components/ButtonModal";
import { GridAddIcon } from "@mui/x-data-grid";
import { AddUserForm } from "../components/AddUserForm";
import { useGetAllUserForAdmin } from "../queries/user";
import { UseAuthContext } from "../context/AuthContext";

export const Users = () => {
  const { dispatch } = UseAuthContext();
  const { data, isLoading, isError } = useGetAllUserForAdmin();

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
        {isLoading && (
          <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
            <CircularProgress color="info" />
          </Backdrop>
        )}

        {isError &&
          dispatch({
            type: "showToast",
            toastType: "error",
            message: "Failed to load users!",
          })}

        {data && <DataGridComponent data={data[0].users} />}
      </Box>
    </Box>
  );
};
