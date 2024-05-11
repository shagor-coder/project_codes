import { Grid, Button } from "@mui/material";
import { InputComponent, SelectComponent } from "../../../components/Input";
import { useEffect, useState } from "react";
import { UseAuthContext } from "../../../context/AuthContext";
import { tableOptions } from "../../../utils/selectOptions";
import { useCreateBooking } from "../services/booking";

export const AddBookingForm = () => {
  const [formData, setFormData] = useState({
    name: "Table 1",
    description: "Best for dating",
    tableLocation: "inside",
    maxPeople: 4,
  });
  const { dispatch } = UseAuthContext();

  const { data, isPending, isError, error, mutate } = useCreateBooking();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "maxPeople")
      return setFormData((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ restaurantId: restaurantId, formData: formData });
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
        message: "Table has been added!",
        toastType: "success",
      });
    }
  }, [data, isError, error]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <SelectComponent
          label="Table Location"
          name="tableLocation"
          handleChange={handleChange}
          value={formData.tableLocation}
          options={tableOptions}
          size={4}
        />

        <InputComponent
          label="Max People in numbers"
          name="maxPeople"
          type="text"
          handleChange={handleChange}
          value={formData.maxPeople}
          autoComplete="autocomplete"
          size={4}
        />

        <SelectComponent
          label="Table Location"
          name="tableLocation"
          handleChange={handleChange}
          value={formData.tableLocation}
          options={tableOptions}
          size={4}
        />

        <Grid item xs={12}>
          {isPending ? (
            <Button type="button" variant="contained" color="info" disabled>
              Please Wait...
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Book Table
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};
