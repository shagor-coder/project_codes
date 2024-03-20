import { Button, Grid } from "@mui/material";
import { InputComponent } from "./Input";
import { useState } from "react";

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

  const handleSubmit = (event) => {};

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
