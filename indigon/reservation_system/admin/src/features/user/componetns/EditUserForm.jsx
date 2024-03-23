import { Button, Grid } from "@mui/material";
import { InputComponent } from "../../../components/Input";
import { useEffect, useState } from "react";
import { UseAuthContext } from "../../../context/AuthContext";
import { useEditUser } from "../services/user";

export const EditUserForm = ({ currentData }) => {
  const { id, name, email, locations } = currentData?.row;

  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "",
    locations: locations || [],
  });

  const { data, isPending, isError, mutate, error } = useEditUser();
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
    mutate({ id: id, formData: formData });
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
        message: "New user has been updated!",
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
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            Edit user
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
