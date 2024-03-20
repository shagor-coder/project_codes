import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { InputComponent } from "./Input";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginForm = () => {
  const navigate = useNavigate();
  const setauthUser = useAuth((state) => state.setauthUser);

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
    try {
      const request = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/auth/login",
        {
          ...formData,
        }
      );
      const authUserData = await request.data;
      console.log(authUserData);
      setauthUser({ ...authUserData.data });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
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
