import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputComponent } from "../../../components/Input";
import { UseAuthContext } from "../../../context/AuthContext";
import { useLogin } from "../services/auth";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { dispatch } = UseAuthContext();
  const { mutate, isPending, isError, data, error } = useLogin();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate(formData);
  };

  useEffect(() => {
    if (data) {
      dispatch({
        type: "login",
        data: data,
      });

      dispatch({
        type: "showToast",
        toastType: "success",
        message: "Login was successful!",
      });
      navigate("/dashboard");
    }

    if (isError) {
      dispatch({
        type: "showToast",
        toastType: "error",
        message: error.message || "There was an error!",
      });
    }
  }, [data, isError]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <InputComponent
          label="Enter your email"
          type="email"
          name="email"
          handleChange={handleChange}
          value={formData.email}
          autoComplete="autoComplete"
        />
        <InputComponent
          label="Enter your password"
          type="password"
          name="password"
          handleChange={handleChange}
          value={formData.password}
          autoComplete="autoComplete"
        />
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color={isError ? "warning" : "primary"}
            disabled={isPending}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            component="div"
          >
            <Typography>
              <Link to="/forgor-password">Forgot your password?</Link>
            </Typography>
            <Typography>
              <Link to="/register">Don't have an account?</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
