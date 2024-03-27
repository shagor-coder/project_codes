import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { DataGridComponent } from "../../components/DataGrid";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import { useGetAllLocations } from "./services/location";
import { useNavigate } from "react-router-dom";

export const Locations = () => {
  const { isLoading, isError, data, error } = useGetAllLocations();
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/locations/${id}`);
  };

  const marketplaceLink = import.meta.env.VITE_GHL_APP_MARKETPLACE_URL;

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

  if (data && data.length) {
    content = (
      <DataGridComponent
        actionNeeded={false}
        handleNavigate={handleNavigate}
        data={data}
        handleDelete={() => {}}
      />
    );
  }

  return (
    <Layout headline="Locations">
      <PagesHeader
        headline="See all your locations"
        IconButton={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.open(marketplaceLink, "_blank");
            }}
          >
            Add to a location
          </Button>
        }
      />

      {content}
    </Layout>
  );
};
