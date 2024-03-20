import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const ignoredFields = ["__v", "isAdmin", "users", "restaurant"];

export const DataGridComponent = ({ data }) => {
  const updateData = data.map((d) => {
    return { ...d, id: d._id };
  });

  const getColumns = () => {
    const d = data[0];
    const keys = Object.keys(d);
    let columns = [];
    keys.forEach((k) => {
      if (ignoredFields.includes(k)) return;
      let obj = {
        field: "",
        headerName: "",
        type: "",
        width: 150,
      };
      obj.field = k === "_id" ? k.replace("_", "") : k;
      obj.headerName = k.toString().toUpperCase();
      obj.type = typeof k;
      columns.push(obj);
    });
    return columns;
  };

  return (
    <Box sx={{ height: 600, width: 1 }}>
      {data ? (
        <DataGrid
          rows={updateData}
          columns={getColumns()}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
      ) : (
        "No data available"
      )}
    </Box>
  );
};
