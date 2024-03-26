import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import { useGetCurrentRestaurant } from "./services/restaurant";

export const Restaurant = () => {
  const { locationId, restaurantId } = useParams();

  const { isLoading, isError, data, error } = useGetCurrentRestaurant({
    locationId,
    restaurantId,
  });
  const { dispatch } = UseAuthContext();

  let content = "";

  if (isLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        toastType: "error",
        message: error.message,
      });
    }
  }, [isError, data]);

  if (data && data._id) {
    content = "Hello this is a restaurant";
  }

  return (
    <Layout headline="Restaurant">
      <PagesHeader
        headline="See all your Restaurant"
        IconButton={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.open("/", "_blank");
            }}
          >
            Hello
          </Button>
        }
      />

      {content}
    </Layout>
  );
};
