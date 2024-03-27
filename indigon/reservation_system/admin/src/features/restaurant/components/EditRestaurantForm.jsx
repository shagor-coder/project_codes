import { Button, Grid } from "@mui/material";
import { InputComponent, TextareaComponent } from "../../../components/Input";
import { useEffect, useState } from "react";
import { useEditRestaurant } from "../services/restaurant";
import { UseAuthContext } from "../../../context/AuthContext";
import { MultiSelectComponent } from "../../../components/MultiSelect";
import { useParams } from "react-router-dom";
import { useGetAllMenus } from "../../menu/services/menu";

export const EditRestaurantForm = ({ currentData }) => {
  const { id } = useParams();

  const {
    id: restuarntId,
    name,
    description,
    addressLine,
    priceRange,
    cuisines,
    diningStyle,
    dressCode,
    parkingDetails,
    executiveChef,
    paymentOptions,
    website,
    phone,
    menus,
    photos,
  } = currentData.row;

  const [formData, setFormData] = useState({
    name: name,
    description: description,
    addressLine: addressLine,
    priceRange: priceRange,
    cuisines: cuisines,
    diningStyle: diningStyle,
    dressCode: dressCode,
    parkingDetails: parkingDetails,
    executiveChef: executiveChef,
    paymentOptions: paymentOptions,
    website: website,
    phone: phone,
    menus: [...menus],
    photos: [...photos],
  });

  const { data, isPending, isError, mutate, error } = useEditRestaurant();
  const {
    data: menusData,
    isLoading,
    isError: isMenuLoadingError,
    error: menusError,
  } = useGetAllMenus();
  const { dispatch } = UseAuthContext();

  const handleMultiSelectChange = (event, newValue) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      menus: newValue,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name" || name === "description") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        additionalInfo: {
          ...prevState.additionalInfo,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ locationId: id, restaurantId: restuarntId, formData: formData });
  };

  useEffect(() => {
    if (isError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
    }

    if (isMenuLoadingError) {
      dispatch({
        type: "showToast",
        message: menusError.message,
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
          size={6}
        />
        <TextareaComponent
          label="Description"
          type="textarea"
          name="description"
          handleChange={handleChange}
          value={formData.description}
          size={6}
        />
        <InputComponent
          label="Full Address"
          type="text"
          name="addressLine"
          handleChange={handleChange}
          value={formData.additionalInfo.addressLine}
          size={6}
        />
        <InputComponent
          label="Price Range"
          type="text"
          name="priceRange"
          handleChange={handleChange}
          value={formData.additionalInfo.priceRange}
          size={6}
        />
        <InputComponent
          label="Cuisines"
          type="text"
          name="cuisines"
          handleChange={handleChange}
          value={formData.additionalInfo.cuisines}
          size={6}
        />
        <InputComponent
          label="Dinig Styles"
          type="text"
          name="diningStyle"
          handleChange={handleChange}
          value={formData.additionalInfo.diningStyle}
          size={6}
        />
        <InputComponent
          label="Dress Code"
          type="text"
          name="dressCode"
          handleChange={handleChange}
          value={formData.additionalInfo.dressCode}
          size={6}
        />
        <InputComponent
          label="Parking Details"
          type="text"
          name="parkingDetails"
          handleChange={handleChange}
          value={formData.additionalInfo.parkingDetails}
          size={6}
        />
        <InputComponent
          label="Executive Chef"
          type="text"
          name="executiveChef"
          handleChange={handleChange}
          value={formData.additionalInfo.executiveChef}
          size={6}
        />
        <InputComponent
          label="Payment Options"
          type="text"
          name="paymentOptions"
          handleChange={handleChange}
          value={formData.additionalInfo.paymentOptions}
          size={6}
        />
        <InputComponent
          label="Website"
          type="text"
          name="website"
          handleChange={handleChange}
          value={formData.additionalInfo.website}
          size={6}
        />
        <InputComponent
          label="Phone Number"
          type="text"
          name="phone"
          handleChange={handleChange}
          value={formData.additionalInfo.phone}
          size={6}
        />
        {isLoading ? (
          "Menus Loading"
        ) : (
          <MultiSelectComponent
            name="menus"
            handleChange={handleMultiSelectChange}
            options={menusData}
            limit={3}
            label="Menu Items"
            size={12}
          />
        )}
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
