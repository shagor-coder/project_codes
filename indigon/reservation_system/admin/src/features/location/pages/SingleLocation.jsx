import { Backdrop, Box, CircularProgress } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGridComponent } from "../../../components/DataGrid";
import { Layout } from "../../../components/Layout";
import { PagesHeader } from "../../../components/PagesHeader";
import { UseAuthContext } from "../../../context/AuthContext";
import {
  useDeleteRestaurant,
  useGetAllRestaurant,
} from "../../restaurant/services/restaurant";

export const SingleLocation = () => {
  const { id: locationId } = useParams();
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  // const { data, isLoading, isError, error } = useGetCurrentLocation(locationId);
  const { data: restaurants, isLoading: isRestaurantsLoading } =
    useGetAllRestaurant(locationId);

  const {
    data: deleted,
    isError: isDeletedError,
    error: deleteError,
    mutate,
  } = useDeleteRestaurant();

  const handleNavigate = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const handleRestaurantDelete = (params) => {
    mutate({
      locationId: locationId,
      restaurantId: params.id,
    });
  };

  useEffect(() => {
    if (deleted) {
      dispatch({
        type: "showToast",
        message: "Restaurant has been deleted!",
        toastType: "success",
      });
    }

    if (isDeletedError) {
      dispatch({
        type: "showToast",
        message: deleteError.message,
        toastType: "error",
      });
    }
  }, [restaurants, isRestaurantsLoading, isDeletedError, deleteError, deleted]);

  let content = null;

  if (isRestaurantsLoading)
    content = (
      <Backdrop
        sx={{ color: "#fff", zIndex: 9999 }}
        open={isRestaurantsLoading}
      >
        <CircularProgress color="info" />
      </Backdrop>
    );

  if (restaurants && restaurants.length) {
    const formattedData = restaurants.map((restaurant) => {
      const {
        id,
        name,
        description,
        openingHours,
        closingHours,
        bookingDuration,
        addressLine,
      } = restaurant;

      return {
        id,
        name,
        description,
        openingHours,
        closingHours,
        bookingDuration,
        addressLine,
      };
    });

    content = (
      <Box component="section">
        <DataGridComponent
          actionNeeded={false}
          handleDelete={handleRestaurantDelete}
          EditForm={<Box></Box>}
          data={formattedData}
          handleNavigate={handleNavigate}
        />
      </Box>
    );
  }

  return (
    <Layout headline="Location">
      <PagesHeader
        headline="All restaurant in this location"
        IconButton={
          <GridAddIcon
            sx={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/restaurants/${locationId}/new-restaurant`)
            }
          ></GridAddIcon>
        }
      />
      {content}
    </Layout>
  );
};
