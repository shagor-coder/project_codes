import { Backdrop, Box, Button, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import { useGetCurrentRestaurant } from "./services/restaurant";
import { useDeleteTable, useGetAllTable } from "../table/services/table";
import { DataGridComponent } from "../../components/DataGrid";

export const SingleRestaurant = () => {
  const { restaurantId } = useParams();
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useGetCurrentRestaurant({
    restaurantId: restaurantId,
  });

  const { data: tables, isLoading: isTableLoading } = useGetAllTable({
    restaurantId: restaurantId,
  });

  const {
    isSuccess: isTableDeleted,
    isError: isTableDeleteError,
    error: tableDeleteError,
    mutate,
  } = useDeleteTable();

  const handleDelete = (data) => {
    mutate({ tableId: data.id });
  };

  const handleNavigate = (id) => {
    navigate(`/tables/${id}/bookings`);
  };

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        toastType: "error",
        message: error.message,
      });
    }
    if (isTableDeleteError) {
      dispatch({
        type: "showToast",
        toastType: "error",
        message: tableDeleteError.message,
      });
    }

    if (isTableDeleted) {
      dispatch({
        type: "showToast",
        toastType: "success",
        message: "Table has been deleted!",
      });
    }
  }, [isError, data, isTableDeleted]);

  let content = "";

  if (isLoading || isTableLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  if (data) {
    content = (
      <Box>
        <PagesHeader
          headline={data?.name}
          IconButton={
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/restaurants`)}
                >
                  Go Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate(`/restaurants/${restaurantId}/edit-restaurant`);
                  }}
                >
                  Edit
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate(`/tables/${restaurantId}/add-table`);
                  }}
                >
                  Add Table
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.open("/", "_blank");
                  }}
                >
                  Get Link
                </Button>
              </Grid>
            </Grid>
          }
        />
      </Box>
    );
  }
  if (tables && tables.length) {
    content = (
      <Box>
        <PagesHeader
          headline={`Tables in ${data?.name}`}
          IconButton={
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/restaurants`)}
                >
                  Go back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate(`/restaurants/${restaurantId}/edit-restaurant`);
                  }}
                >
                  Edit
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate(`/tables/${restaurantId}/add-table`);
                  }}
                >
                  Add Table
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(`${new URL(location.href).href}`)
                      .then(() => {
                        dispatch({
                          type: "showToast",
                          toastType: "success",
                          message: "Public Link Copied!",
                        });
                      })
                      .catch((e) => {
                        console.log(error);
                      });
                  }}
                >
                  Get Restaurant Public Link
                </Button>
              </Grid>
            </Grid>
          }
        />
        <Box component="section">
          <DataGridComponent
            data={tables}
            actionNeeded={false}
            handleDelete={handleDelete}
            handleNavigate={handleNavigate}
          />
        </Box>
      </Box>
    );
  }

  return <Layout headline={`${data?.name}`}>{content}</Layout>;
};
