import { Box } from "@mui/material";
import { CardComponent } from "../../components/Card";
import { LoginForm } from "./components/LoginForm";

export const Login = () => {
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
          headline="Log in to your account"
          cardcontent={<LoginForm />}
        ></CardComponent>
      </Box>
    </div>
  );
};
