import { Button, Grid } from "@mui/material";
import {
  FileUploadComponent,
  InputComponent,
  TextareaComponent,
} from "../../../components/Input";
import { useEffect, useState } from "react";
import { useCreateRestaurant } from "../services/restaurant";
import { UseAuthContext } from "../../../context/AuthContext";
import { MultiSelectComponent } from "../../../components/MultiSelect";
import { useParams } from "react-router-dom";
import { useGetAllMenus } from "../../menu/services/menu";

export const AddRestaurantForm = () => {
  const { id } = useParams();

  const [restaurantData, setRestaurantData] = useState({
    name: "Awesome restaurant 3",
    description: "The best restaurant",
    additionalInfo: {
      addressLine: "123 new york",
      priceRange: "$10 - $100",
      cuisines: "American",
      diningStyle: "Casual",
      dressCode: "Casual",
      parkingDetails: "Basement",
      executiveChef: "Shagor",
      paymentOptions: "Mastercard",
      website: "https://www.acmerestaurant.com",
      phone: "+8801742677273",
    },
    menus: [],
  });

  const [images, setImages] = useState([]);

  const { data, isPending, isError, mutate, error } = useCreateRestaurant();
  const {
    data: menusData,
    isLoading,
    isError: isMenuLoadingError,
    error: menusError,
  } = useGetAllMenus();
  const { dispatch } = UseAuthContext();

  const handleMultiSelectChange = (event, newValue) => {
    event.preventDefault();
    setRestaurantData((prevData) => ({
      ...prevData,
      menus: newValue,
    }));
  };

  const handleFileUpload = (event) => {
    const { files } = event.target;
    setImages(files);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name" || name === "description") {
      setRestaurantData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setRestaurantData((prevState) => ({
        ...prevState,
        additionalInfo: {
          ...prevState.additionalInfo,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append top-level fields directly
    formData.append("name", restaurantData.name);
    formData.append("description", restaurantData.description);

    // Append additionalInfo fields
    const additionalInfo = restaurantData.additionalInfo;
    for (const key in additionalInfo) {
      formData.append(`additionalInfo[${key}]`, additionalInfo[key]);
    }

    // Append photos
    formData.append("photos", images);

    console.log(images);

    // Call the mutate function with the formData
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
          value={restaurantData.name}
          size={6}
        />
        <TextareaComponent
          label="Description"
          type="textarea"
          name="description"
          handleChange={handleChange}
          value={restaurantData.description}
          size={6}
        />
        <InputComponent
          label="Full Address"
          type="text"
          name="addressLine"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.addressLine}
          size={6}
        />
        <InputComponent
          label="Price Range"
          type="text"
          name="priceRange"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.priceRange}
          size={6}
        />
        <InputComponent
          label="Cuisines"
          type="text"
          name="cuisines"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.cuisines}
          size={6}
        />
        <InputComponent
          label="Dinig Styles"
          type="text"
          name="diningStyle"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.diningStyle}
          size={6}
        />
        <InputComponent
          label="Dress Code"
          type="text"
          name="dressCode"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.dressCode}
          size={6}
        />
        <InputComponent
          label="Parking Details"
          type="text"
          name="parkingDetails"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.parkingDetails}
          size={6}
        />
        <InputComponent
          label="Executive Chef"
          type="text"
          name="executiveChef"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.executiveChef}
          size={6}
        />
        <InputComponent
          label="Payment Options"
          type="text"
          name="paymentOptions"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.paymentOptions}
          size={6}
        />
        <InputComponent
          label="Website"
          type="text"
          name="website"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.website}
          size={6}
        />
        <InputComponent
          label="Phone Number"
          type="text"
          name="phone"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.phone}
          size={6}
        />

        <FileUploadComponent
          name="photos"
          size={6}
          handleChange={handleFileUpload}
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
            size={6}
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
