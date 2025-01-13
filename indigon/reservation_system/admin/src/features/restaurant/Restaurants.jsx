import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGridComponent } from "../../components/DataGrid";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import {
  useDeleteRestaurant,
  useGetAllRestaurant,
} from "./services/restaurant";

export const Restaurants = () => {
  const { auth, dispatch } = UseAuthContext();

  const { isLoading, isError, data, error } = useGetAllRestaurant(
    auth?.authUser?.locationId
  );

  const {
    isError: isDeleteError,
    error: deleteError,
    isSuccess: isDeleted,
    mutate,
  } = useDeleteRestaurant();

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const handleDeleteRestaurant = (params) => {
    mutate({ restaurantId: params.id });
  };

  let content = "";

  if (isLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  useEffect(() => {
    if (isError || isDeleteError || deleteError) {
      dispatch({
        type: "showToast",
        toastType: "error",
        message: error.message,
      });
    }
    if (isDeleted) {
      dispatch({
        type: "showToast",
        toastType: "success",
        message: "Restaurant has been deleted!!",
      });
    }
  }, [isError, isDeleted, isDeleteError, deleteError]);

  if (data && data.length) {
    content = (
      <DataGridComponent
        actionNeeded={false}
        handleNavigate={handleNavigate}
        data={data}
        handleDelete={handleDeleteRestaurant}
      />
    );
  }

  return (
    <Layout headline="Restaurants">
      <PagesHeader
        headline="See all your restaurants"
        IconButton={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(
                `/restaurants/${auth?.authUser?.locationId}/new-restaurant`
              );
            }}
          >
            Add A Restaurant
          </Button>
        }
      />
      {content}
    </Layout>
  );
};
