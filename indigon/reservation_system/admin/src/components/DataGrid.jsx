import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { capitalizeText } from "../utils/capitalizeText";
import { FormModal } from "./FormModal";
import { formatReadableTime } from "../utils/formatTime";

const ignoredFields = [
  "isAdmin",
  "users",
  "restaurant",
  "id",
  "userId",
  "updatedAt",
  "createdAt",
  "clientId",
  "tableId",
];

const timeStampFields = ["startTime", "endTime"];

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
    let obj = { ...d, id: d.id };

    const keys = Object.keys(obj);

    keys.forEach((k) => {
      if (timeStampFields.includes(k)) {
        obj[k] = formatReadableTime(d[k]);
      }
    });
    return obj;
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
        width: timeStampFields.includes(k) ? 220 : 200,
      };
      obj.field = k;
      obj.headerName = capitalizeText(k.toString());
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
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDelete(params)}
            />,
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Go to"
              onClick={() => {
                const { id } = params;
                handleNavigate(id);
              }}
            />,
          ],
        });
  }

  return (
    <Box sx={{ maxWidth: `100%`, height: "600px" }}>
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
