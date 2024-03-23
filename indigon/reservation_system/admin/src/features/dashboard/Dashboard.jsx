import { Box, Grid } from "@mui/material";
import { Sidebar } from "../../components/Sidebar";
import { StatisticsCard } from "./components/StatisticsCard";
import { UseAuthContext } from "../../context/AuthContext";

export const Dashboard = () => {
  const { auth } = UseAuthContext();
  const { isAdmin } = auth.authUser;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar headline="Dashboard" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Grid container spacing={2}>
          {isAdmin && (
            <Grid item xs={12} sm={6} md={4}>
              <StatisticsCard headline="Users" total="10" path="/users" />
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={4}>
            <StatisticsCard headline="Locations" total="10" path="/locations" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
