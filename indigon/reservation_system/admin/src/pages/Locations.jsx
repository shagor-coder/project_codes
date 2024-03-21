import { Box, Button, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { DataGridComponent } from "../components/DataGrid";
import { PagesHeader } from "../components/PagesHeader";

export const Locations = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar headline="Locations" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <PagesHeader
          headline="See all your locations"
          IconButton={
            <Button variant="contained" color="primary">
              Add to a location
            </Button>
          }
        />
        {/* {loading && !error && (
          <Typography component="h6">Please wait ...</Typography>
        )}
        {!loading && error && (
          <Typography component="h6" color="darkred">
            There was an error!!
          </Typography>
        )}
        {!loading && !error && data && <DataGridComponent data={data} />} */}
      </Box>
    </Box>
  );
};
