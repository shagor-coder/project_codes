import { Grid } from "@mui/material";
import { Layout } from "../../../components/Layout";
import { AddRestaurantForm } from "../components/AddRestaurantForm";

export const AddRestaurant = () => {
  return (
    <Layout headline="Add a new restaurant">
      <Grid container>
        <Grid item xs={12} md={9}>
          <AddRestaurantForm />
        </Grid>
      </Grid>
    </Layout>
  );
};
