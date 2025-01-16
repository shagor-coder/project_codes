import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { InputComponent } from "../../../components/Input";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../services/auth";
import { UseAuthContext } from "../../../context/AuthContext";

export const RegisterForm = () => {
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { error, isError, isSuccess, mutate: doRegister } = useRegister();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doRegister(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({
        type: "showToast",
        toastType: "success",
        message: "Registration successfull!",
      });

      navigate(`/login`);
    }

    if (isError) {
      dispatch({
        type: "showToast",
        toastType: "error",
        message: error?.message,
      });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <InputComponent
          label="Enter your full name"
          type="text"
          name="name"
          handleChange={handleChange}
          value={formData.name}
          autoComplete="autoComplete"
        />
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
          <Button type="submit" variant="contained" color="primary">
            Register
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
              <Link to="/login">Have an account?</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
