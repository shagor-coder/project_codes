import { useParams, useNavigate } from "react-router-dom";
import { useGetCurrentTable } from "./services/table";
import { useEffect } from "react";
import { UseAuthContext } from "../../context/AuthContext";
import { DataGridComponent } from "../../components/DataGrid";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { Box, Button } from "@mui/material";
import { EditBookingInfo } from "./components/EditBookingInfo";

export const Table = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading, error } = useGetCurrentTable({
    tableId: tableId,
  });
  const { dispatch } = UseAuthContext();

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
    }
  }, [data, isError, isLoading]);

  let content = null;

  if (data) {
    content = (
      <Box>
        <PagesHeader
          headline="Total Booking"
          IconButton={
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(`/restaurants/${data.restaurantId[0]}`);
              }}
            >
              Go back
            </Button>
          }
        />
        {data.bookedTimes && data.bookedTimes.length ? (
          <DataGridComponent
            data={data.bookedTimes}
            handleDelete={() => {}}
            actionNeeded={true}
            EditForm={EditBookingInfo}
          />
        ) : null}
      </Box>
    );
  }

  return <Layout headline="Booking info">{content}</Layout>;
};
