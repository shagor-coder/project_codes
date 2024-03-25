import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { DataGridComponent } from "../../components/DataGrid";
import { PagesHeader } from "../../components/PagesHeader";
import { Sidebar } from "../../components/Sidebar";
import { UseAuthContext } from "../../context/AuthContext";
import { useGetAllLocations } from "./services/location";

export const Locations = () => {
  const { isLoading, isError, data, error } = useGetAllLocations();
  const { dispatch } = UseAuthContext();

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
      <DataGridComponent data={data} handleDelete={() => {}} EditForm={Box} />
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar headline="Locations" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
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
      </Box>
    </Box>
  );
};
