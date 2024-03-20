import { Box, Button } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { DataGridComponent } from "../components/DataGrid";
import { PagesHeader } from "../components/PagesHeader";
import { GridAddIcon } from "@mui/x-data-grid";

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
        <DataGridComponent />
      </Box>
    </Box>
  );
};
