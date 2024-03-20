import { Box, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { PagesHeader } from "../components/PagesHeader";
import { DataGridComponent } from "../components/DataGrid";
import { ButtonModal } from "../components/ButtonModal";
import { GridAddIcon } from "@mui/x-data-grid";
import { AddUserForm } from "../components/AddUserForm";
import axios from "axios";

export const Users = () => {
  const getUsers = async () => {
    try {
      const request = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/api/user/all",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const users = await request.data;
      console.log(users);
    } catch (error) {}
  };

  getUsers();

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
        <DataGridComponent />
      </Box>
    </Box>
  );
};
