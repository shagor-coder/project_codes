import { Grid } from "@mui/material";
import { Layout } from "../../components/Layout";
import { UseAuthContext } from "../../context/AuthContext";
import { StatisticsCard } from "./components/StatisticsCard";

export const Dashboard = () => {
  const { auth } = UseAuthContext();
  const { isAdmin } = auth.authUser;

  return (
    <Layout headline="Dashboard">
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
    </Layout>
  );
};
