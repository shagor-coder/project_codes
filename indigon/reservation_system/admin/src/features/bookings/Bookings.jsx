import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonModal } from "../../components/ButtonModal";
import { DataGridComponent } from "../../components/DataGrid";
import { Layout } from "../../components/Layout";
import { PagesHeader } from "../../components/PagesHeader";
import { UseAuthContext } from "../../context/AuthContext";
import { EditBookingInfo } from "./components/EditBookingInfo";
import { useGetAllBooking } from "./services/booking";
import AddIcon from "@mui/icons-material/Add";
import { AddBookingForm } from "./components/AddBookingForm";

export const Bookings = () => {
  const navigate = useNavigate();
  const { dispatch, auth } = UseAuthContext();

  console.log(auth);

  const { data, isError, isLoading, error } = useGetAllBooking({
    locationId: auth?.authUser?.locations[0],
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
          data={data.bookedTimes}
          handleDelete={() => {}}
          actionNeeded={true}
          EditForm={EditBookingInfo}
        />
      ) : null;
  }

  return (
    <Layout headline="Booking info">
      <Box>
        <PagesHeader
          headline="Total Booking"
          IconButton={
            <ButtonModal
              buttonIcon={<AddIcon />}
              modalHeadline="Book A Table"
              modalForm={<AddBookingForm />}
            />
          }
        />
        {content}
      </Box>
    </Layout>
  );
};
