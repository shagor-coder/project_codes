import { Typography, Button, Container, Stack } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Not Found
        </Typography>
        <Typography variant="subtitle1">
          Oops! We can't seem to find the page you're looking for.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
