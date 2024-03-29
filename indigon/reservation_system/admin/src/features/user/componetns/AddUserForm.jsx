import { Button, Grid } from "@mui/material";
import { InputComponent } from "../../../components/Input";
import { useEffect, useState } from "react";
import { useCreateUserForAdmin } from "../services/user";
import { UseAuthContext } from "../../../context/AuthContext";

export const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { data, isPending, isError, mutate, error } = useCreateUserForAdmin();
  const { dispatch } = UseAuthContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formData);
  };

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
    }

    if (data) {
      dispatch({
        type: "showToast",
        message: "New user has been created!",
        toastType: "success",
      });
    }
  }, [data, isError, isPending, error]);

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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            Add user
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
