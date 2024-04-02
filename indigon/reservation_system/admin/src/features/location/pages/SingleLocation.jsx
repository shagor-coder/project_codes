import { useNavigate, useParams } from "react-router-dom";
import { useGetCurrentLocation } from "../services/location";
import { useEffect } from "react";
import { UseAuthContext } from "../../../context/AuthContext";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import { Layout } from "../../../components/Layout";
import { PagesHeader } from "../../../components/PagesHeader";
import { GridAddIcon } from "@mui/x-data-grid";
import {
  useDeleteRestaurant,
  useGetAllRestaurant,
} from "../../restaurant/services/restaurant";
import { DataGridComponent } from "../../../components/DataGrid";

export const SingleLocation = () => {
  const { id: locationId } = useParams();
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetCurrentLocation(locationId);
  const {
    data: restaurants,
    isLoading: isRestaurantsLoading,
    isError: isRestaurantsError,
    error: restaurantsError,
  } = useGetAllRestaurant(locationId);

  const {
    data: deleted,
    isError: isDeletedError,
    error: deleteError,
    mutate,
  } = useDeleteRestaurant();

  const handleNavigate = (id) => {
    navigate(`/restaurants/${locationId}/${id}`);
  };

  const handleRestaurantDelete = (params) => {
    mutate({
      locationId: locationId,
      restaurantId: params.id,
    });
  };

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
    }

    if (isRestaurantsError) {
      dispatch({
        type: "showToast",
        message: restaurantsError.message,
        toastType: "error",
      });
    }
  }, [
    isError,
    data,
    isLoading,
    restaurants,
    isRestaurantsLoading,
    isRestaurantsError,
    isDeletedError,
    deleteError,
    deleted,
  ]);

  let content = null;

  if (isLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  if (restaurants && restaurants.length) {
    const formattedData = restaurants.map((restaurant) => {
      const { _id, name, createdAt, updatedAt, description } = restaurant;

      return { _id, name, description, createdAt, updatedAt };
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
