import { Box, Button } from "@mui/material";
import { Layout } from "../../../components/Layout";
import { PagesHeader } from "../../../components/PagesHeader";
import { AddTableForm } from "../components/AddTableForm";
import { useParams, useNavigate } from "react-router-dom";

export const AddTable = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  return (
    <Layout headline="Add a table">
      <PagesHeader
        headline={"Table"}
        IconButton={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/restaurants/${restaurantId}`)}
          >
            Go back
          </Button>
        }
      />
      <AddTableForm />
    </Layout>
  );
};
