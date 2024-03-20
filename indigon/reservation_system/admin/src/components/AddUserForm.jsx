import { Button, Grid } from "@mui/material";
import { InputComponent } from "./Input";
import { useState } from "react";
import axios from "axios";

export const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
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
        import.meta.env.VITE_API_BASE_URL + "/api/user",
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );
      const authUserData = await request.data;
      // navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <InputComponent
          label="Name"
          type="text"
          name="name"
          handleChange={handleChange}
          value={formData.name}
        />
        <InputComponent
          label="Email"
          type="email"
          name="email"
          handleChange={handleChange}
          value={formData.email}
        />
        <InputComponent
          label="Password"
          type="password"
          name="password"
          handleChange={handleChange}
          value={formData.password}
        />
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
