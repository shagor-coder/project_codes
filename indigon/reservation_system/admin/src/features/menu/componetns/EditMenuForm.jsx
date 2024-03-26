import { Button, Grid } from "@mui/material";
import {
  InputComponent,
  SelectComponent,
  TextareaComponent,
} from "../../../components/Input";
import { useEffect, useState } from "react";
import { UseAuthContext } from "../../../context/AuthContext";
import { useEditMenu } from "../services/menu";
import {
  menuTypeOptions,
  platterNameOptions,
} from "../../../utils/selectOptions";

export const EditMenuForm = ({ currentData }) => {
  const { id, name, description, menuType, platterName } = currentData?.row;

  const [formData, setFormData] = useState({
    name: name,
    menuType: menuType,
    description: description,
    platterName: platterName,
  });

  const { data, isPending, isError, mutate, error } = useEditMenu();
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
        message: "Menu has been updated!",
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
            Update Menu
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
