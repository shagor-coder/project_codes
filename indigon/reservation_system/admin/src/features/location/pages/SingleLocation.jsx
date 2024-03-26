import { useParams } from "react-router-dom";
import { useGetCurrentLocation } from "../services/location";
import { useEffect } from "react";
import { UseAuthContext } from "../../../context/AuthContext";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import { Layout } from "../../../components/Layout";
import { AddRestaurantForm } from "../../restaurant/components/AddRestaurantForm";
import { PagesHeader } from "../../../components/PagesHeader";
import { ButtonModal } from "../../../components/ButtonModal";
import { GridAddIcon } from "@mui/x-data-grid";

export const SingleLocation = () => {
  const { id } = useParams();
  const { dispatch } = UseAuthContext();

  const { data, isLoading, isError, error } = useGetCurrentLocation(id);

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
    }
  }, [isError, data, isLoading, error]);

  let content = null;

  if (isLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  if (data && data._id)
    content = (
      <Box component="section">
        <Grid container>
          <Grid item sm={6}>
            This location has total {data?.restaurant?.length} restaurants.
          </Grid>
        </Grid>
      </Box>
    );

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
