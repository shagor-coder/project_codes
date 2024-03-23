import { Box } from "@mui/material";
import { CardComponent } from "../../components/Card";
import { LoginForm } from "./components/LoginForm";
import { UseAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const { auth } = UseAuthContext();
  const { isLoggedIn, authUser } = auth;

  useEffect(() => {
    if (authUser && isLoggedIn) {
      navigate("/dashboard");
    }
  }, [authUser, isLoggedIn, navigate]);

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
