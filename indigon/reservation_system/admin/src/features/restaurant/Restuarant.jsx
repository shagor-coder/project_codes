import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import { useGetCurrentRestaurant } from "./services/restaurant";

export const Restaurant = () => {
  const { locationId, restaurantId } = useParams();

  const { isLoading, isError, data, error } = useGetCurrentRestaurant({
    locationId: locationId,
    restaurantId: restaurantId,
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
    const keys = Object.keys(data);
    content = (
      <Box>
        <PagesHeader
          headline={data?.name}
          IconButton={
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window.open("/", "_blank");
              }}
            >
              Get Booking Link
            </Button>
          }
        />
        <Box component="section">
          <Grid container spacing={2}>
            {keys.map((key) => {
              if (typeof key === "object") return null;
              return (
                <Grid item xs={12} md={6} lg={4} key={key}>
                  <Card>
                    <CardContent>
                      <CardHeader title={key}></CardHeader>
                      {JSON.stringify(data[key])}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    );
  }

  return <Layout headline="Restaurant">{content}</Layout>;
};
