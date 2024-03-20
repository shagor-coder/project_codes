import { Box, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { PagesHeader } from "../components/PagesHeader";
import { DataGridComponent } from "../components/DataGrid";
import { ButtonModal } from "../components/ButtonModal";
import { GridAddIcon } from "@mui/x-data-grid";
import { AddUserForm } from "../components/AddUserForm";
import { useFetch } from "../hooks/useFetch";

export const Users = () => {
  const { data, loading, error } = useFetch(
    import.meta.env.VITE_API_BASE_URL + "/api/user/all"
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
        {loading && !error && (
          <Typography component="h6">Please wait ...</Typography>
        )}
        {!loading && error && (
          <Typography component="h6" color="darkred">
            There was an error!!
          </Typography>
        )}
        {!loading && !error && data && (
          <DataGridComponent data={data[0].users} />
        )}
      </Box>
    </Box>
  );
};
