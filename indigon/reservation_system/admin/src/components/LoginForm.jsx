import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { InputComponent } from "./Input";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../queries/auth";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { data, isPending, isError, mutate } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <InputComponent
          label="Enter your email"
          type="email"
          name="email"
          handleChange={handleChange}
          value={formData.email}
        />
        <InputComponent
          label="Enter your password"
          type="password"
          name="password"
          handleChange={handleChange}
          value={formData.password}
        />
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
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
