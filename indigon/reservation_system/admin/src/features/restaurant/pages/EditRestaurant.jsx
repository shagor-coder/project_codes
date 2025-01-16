import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { Layout } from "../../../components/Layout";
import { MenuItem } from "../../../components/MenuItem";
import { EditRestaurantForm } from "../components/EditRestaurantForm";
import { useParams } from "react-router-dom";

export const EditRestaurant = () => {
  const { restaurantId } = useParams();
  return (
    <Layout headline="Edit Restaurant">
      <Grid container gap={1}>
        <Grid item xs={12} md={12}>
          <MenuItem
            icon={<ChevronLeft />}
            name="Go back"
            handleClick={() => {}}
            path={`/restaurants/${restaurantId}`}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <EditRestaurantForm></EditRestaurantForm>
        </Grid>
      </Grid>
    </Layout>
  );
};
