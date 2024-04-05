import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import { MenuItem } from "../../../components/MenuItem";
import { AddRestaurantForm } from "../components/AddRestaurantForm";

export const AddRestaurant = () => {
  const { locationId } = useParams();
  return (
    <Layout headline="Add a new restaurant">
      <Grid container gap={1}>
        <Grid item xs={12} md={3}>
          <MenuItem
            icon={<ChevronLeft />}
            name="Locations"
            handleClick={() => {}}
            path={`/locations/${locationId}`}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <AddRestaurantForm />
        </Grid>
      </Grid>
    </Layout>
  );
};
