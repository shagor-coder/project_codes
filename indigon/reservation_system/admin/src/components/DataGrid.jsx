import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FormModal } from "./FormModal";
import { useState } from "react";

const ignoredFields = ["__v", "isAdmin", "users", "restaurant"];

export const DataGridComponent = ({ data, handleDelete, EditForm }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);

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

  const columns = getColumns();

  columns.push({
    field: "actions",
    type: "actions",
    width: 150,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => handleDelete(params)}
      />,
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Update User"
        onClick={() => [setOpenEditModal(true), setCurrentData(params)]}
      />,
    ],
  });

  return (
    <Box sx={{ height: 600, width: 1 }}>
      {data ? (
        <DataGrid
          rows={updateData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
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

      {openEditModal && (
        <FormModal
          modalHeadline="Edit now"
          open={openEditModal}
          setModalOpen={setOpenEditModal}
          modalForm={<EditForm currentData={currentData} />}
        />
      )}
    </Box>
  );
};
