import { Button, Grid } from "@mui/material";
import { InputComponent, TextareaComponent } from "../../../components/Input";
import { useEffect, useState } from "react";
import { useCreateRestaurant } from "../services/restaurant";
import { UseAuthContext } from "../../../context/AuthContext";
import { MultiSelectComponent } from "../../../components/MultiSelect";
import { useParams } from "react-router-dom";

const options = [
  {
    name: "Name",
    value: "value",
  },
  {
    name: "Name 2",
    value: "value2",
  },
  {
    name: "Name 3",
    value: "value3",
  },
];

export const AddRestaurantForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    addressLine: "",
    priceRange: "",
    cuisines: "",
    diningStyle: "",
    dressCode: "",
    parkingDetails: "",
    executiveChef: "",
    paymentOptions: "",
    website: "",
    phone: "",
    menus: [],
    photos: [],
  });

  const { data, isPending, isError, mutate, error } = useCreateRestaurant();
  const { dispatch } = UseAuthContext();

  const handleMultiSelectChange = (event, newValue) => {
    console.log({ event, newValue });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ locationId: id, formData: formData });
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
        <TextareaComponent
          label="Description"
          type="textarea"
          name="description"
          handleChange={handleChange}
          value={formData.description}
        />
        <InputComponent
          label="Full Address"
          type="text"
          name="addressLine"
          handleChange={handleChange}
          value={formData.addressLine}
        />
        <InputComponent
          label="Price Range"
          type="text"
          name="priceRange"
          handleChange={handleChange}
          value={formData.priceRange}
        />
        <InputComponent
          label="Cuisines"
          type="text"
          name="cuisines"
          handleChange={handleChange}
          value={formData.cuisines}
        />
        <InputComponent
          label="Dinig Styles"
          type="text"
          name="diningStyle"
          handleChange={handleChange}
          value={formData.diningStyle}
        />
        <InputComponent
          label="Dress Code"
          type="text"
          name="dressCode"
          handleChange={handleChange}
          value={formData.dressCode}
        />
        <InputComponent
          label="Parking Details"
          type="text"
          name="parkingDetails"
          handleChange={handleChange}
          value={formData.parkingDetails}
        />
        <InputComponent
          label="Executive Chef"
          type="text"
          name="executiveChef"
          handleChange={handleChange}
          value={formData.executiveChef}
        />
        <InputComponent
          label="Payment Options"
          type="text"
          name="paymentOptions"
          handleChange={handleChange}
          value={formData.paymentOptions}
        />
        <InputComponent
          label="Website"
          type="text"
          name="website"
          handleChange={handleChange}
          value={formData.website}
        />
        <MultiSelectComponent
          name="menus"
          handleChange={handleMultiSelectChange}
          options={options}
          limit={3}
        />
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            Add Restaurant
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
