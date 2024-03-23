import { Box } from "@mui/material";
import { CardComponent } from "../../components/Card";
import { RegisterForm } from "./components/RegisterForm";

export const Register = () => {
  return (
    <div style={{ maxWidth: "650px", marginLeft: "auto", marginRight: "auto" }}>
      <Box
        component={"section"}
        sx={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardComponent
          headline="Create a new account"
          cardcontent={<RegisterForm />}
        ></CardComponent>
      </Box>
    </div>
  );
};
