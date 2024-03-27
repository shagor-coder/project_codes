import { useNavigate, useParams } from "react-router-dom";
import { useGetCurrentLocation } from "../services/location";
import { useEffect } from "react";
import { UseAuthContext } from "../../../context/AuthContext";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import { Layout } from "../../../components/Layout";
import { AddRestaurantForm } from "../../restaurant/components/AddRestaurantForm";
import { PagesHeader } from "../../../components/PagesHeader";
import { ButtonModal } from "../../../components/ButtonModal";
import { GridAddIcon } from "@mui/x-data-grid";
import { useGetAllRestaurant } from "../../restaurant/services/restaurant";
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

  const handleNavigate = (id) => {
    navigate(`/restaurants/${locationId}/${id}`);
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
      const singledOption = { ...restaurant, ...restaurant.additionalInfo };
      delete singledOption.additionalInfo;
      return singledOption;
    });

    content = (
      <Box component="section">
        <DataGridComponent
          actionNeeded={false}
          handleDelete={() => {}}
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
          <ButtonModal
            minWid={800}
            modalHeadline="Create Restaurant"
            buttonIcon={<GridAddIcon />}
            modalForm={<AddRestaurantForm />}
          />
        }
      />
      {content}
    </Layout>
  );
};
