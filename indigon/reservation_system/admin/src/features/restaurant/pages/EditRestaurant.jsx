import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import { MenuItem } from "../../../components/MenuItem";
import { EditRestaurantForm } from "../components/EditRestaurantForm";
import { useGetCurrentRestaurant } from "../services/restaurant";

export const EditRestaurant = () => {
  const { restaurantId } = useParams();
  const { data, isLoading, isError } = useGetCurrentRestaurant({
    restaurantId: restaurantId,
  });

  let content = null;

  if (isLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  if (data) content = <EditRestaurantForm data={data}></EditRestaurantForm>;

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
          {content}
        </Grid>
      </Grid>
    </Layout>
  );
};
