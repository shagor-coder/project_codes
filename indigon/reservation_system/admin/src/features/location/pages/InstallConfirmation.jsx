import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../../../context/AuthContext";
import { useCreateLocation } from "../services/location";

export const InstallConfirmation = () => {
  const navigate = useNavigate();
  const url = new URL(location.href);
  const code = url.searchParams.get("code");

  const { dispatch } = UseAuthContext();
  const { data, isLoading, isError, mutate } = useCreateLocation();

  let content = "";

  if (isLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );

  useEffect(() => {
    if (!code) {
      navigate("/locations");
    }
    // mutate(code);
  }, [code]);

  useEffect(() => {
    if (isError)
      dispatch({
        type: "showToast",
        toastType: "error",
        message: "Failed to add location",
      });

    if (data)
      dispatch({
        type: "showToast",
        toastType: "success",
        message: "location added!",
      });
  }, [isError, data]);

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Grid container gap="2">
          <Grid item xs={12}>
            <Typography textAlign="center" component="h2" marginBottom={2}>
              Table Reservation system added to the location.
            </Typography>
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button variant="contained" onClick={() => navigate("/locations")}>
              Back to locations
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
