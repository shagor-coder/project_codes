import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import {
  InputComponent,
  SelectComponent,
  TextareaComponent,
} from "../../../components/Input";
import { UseAuthContext } from "../../../context/AuthContext";
import { useCreateMenu } from "../services/menu";
import {
  menuTypeOptions,
  platterNameOptions,
} from "../../../utils/selectOptions";

export const AddMenuForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    menuType: "",
    description: "",
    platterName: "",
  });

  const { data, isPending, isError, mutate, error } = useCreateMenu();
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
        message: "New menu has been created!",
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
        <TextareaComponent
          label="Description"
          type="text"
          name="description"
          handleChange={handleChange}
          value={formData.description}
        />
        <SelectComponent
          label="Menu Type"
          name="menuType"
          handleChange={handleChange}
          value={formData.menuType}
          options={menuTypeOptions}
        />
        <SelectComponent
          label="Platter Name"
          name="platterName"
          handleChange={handleChange}
          value={formData.platterName}
          options={platterNameOptions}
        />
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            Add Menu
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
