import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

// const VISIBLE_FIELDS = [
//   "name",
//   "rating",
//   "country",
//   "phone",
//   "city",
//   "company",
//   "dateCreated",
//   "isAdmin",
// ];

export const DataGridComponent = ({ data, columnData }) => {
  // const { data } = useDemoData({
  //   dataSet: "Employee",
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // });

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => columnData?.filter((column) => VISIBLE_FIELDS.includes(column)),
    [columnData]
  );

  return (
    <Box sx={{ height: 600, width: 1 }}>
      {data ? (
        <DataGrid
          {...data}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          checkboxSelection
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      ) : (
        "No data available"
      )}
    </Box>
  );
};
