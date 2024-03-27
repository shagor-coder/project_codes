import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { FormModal } from "./FormModal";

const ignoredFields = [
  "__v",
  "isAdmin",
  "users",
  "restaurant",
  "_id",
  "userId",
];

export const DataGridComponent = ({
  data,
  handleDelete,
  EditForm,
  actionNeeded,
  handleNavigate,
}) => {
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
        width: 200,
      };
      obj.field = k === "_id" ? k.replace("_", "") : k;
      obj.headerName = k.toString().toUpperCase();
      obj.type = typeof k;
      columns.push(obj);
    });
    return columns;
  };

  const columns = getColumns();

  {
    actionNeeded
      ? columns.push({
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
              label="Update"
              onClick={() => [setOpenEditModal(true), setCurrentData(params)]}
            />,
          ],
        })
      : columns.push({
          field: "actions",
          type: "actions",
          width: 150,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Update"
              onClick={() => {
                const { id } = params;
                handleNavigate(id);
              }}
            />,
          ],
        });
  }

  return (
    <Box sx={{ maxWidth: "calc(100vw - 230px)", height: "600px" }}>
      {data.length ? (
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

      {openEditModal && actionNeeded && (
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
