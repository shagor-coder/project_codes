import { Box } from "@mui/material";
import { useEffect } from "react";
import { DataGridComponent } from "../../components/DataGrid";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import { EditBookingInfo } from "./components/EditBookingInfo";
import { useGetAllBooking } from "./services/booking";

export const Bookings = () => {
  const { dispatch, auth } = UseAuthContext();

  const { data, isError, isLoading, error } = useGetAllBooking({
    locationId: auth?.authUser?.locationId,
  });

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
    content =
      data && data.length ? (
        <DataGridComponent
          data={data}
          handleDelete={() => {}}
          actionNeeded={true}
          EditForm={EditBookingInfo}
        />
      ) : null;
  }

  return (
    <Layout headline="Booking info">
      <Box>
        <PagesHeader headline="All Bookings" IconButton={data?.length} />
        {content}
      </Box>
    </Layout>
  );
};
