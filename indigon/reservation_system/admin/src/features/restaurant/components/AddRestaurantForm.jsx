import { Button, Grid, ImageList, ImageListItem } from "@mui/material";
import {
  FileUploadComponent,
  InputComponent,
  TextareaComponent,
} from "../../../components/Input";
import { useEffect, useState } from "react";
import { useCreateRestaurant } from "../services/restaurant";
import { UseAuthContext } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";

export const AddRestaurantForm = () => {
  const { locationId } = useParams();

  const [restaurantData, setRestaurantData] = useState({
    name: "Awesome restaurant 3",
    description: "The best restaurant",
    addressLine: "123 new york",
    priceRange: "$10 - $100",
    openingHours: "9.00am",
    closingHours: "5.00pm",
    additionalInfo: {
      cuisines: "American",
      diningStyle: "Casual",
      dressCode: "Casual",
      parkingDetails: "Basement",
      executiveChef: "Shagor",
      paymentOptions: "Mastercard",
      website: "https://www.acmerestaurant.com",
      phone: "+8801742677273",
    },
  });

  const [images, setImages] = useState([]);

  const { data, isPending, isError, mutate, error } = useCreateRestaurant();
  const { dispatch } = UseAuthContext();

  const handleFileUpload = (event) => {
    const { files } = event.target;
    setImages((prevState) => {
      return [...Array.from(prevState), ...Array.from(files)];
    });
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

    formData.append("name", restaurantData.name);
    formData.append("description", restaurantData.description);
    formData.append("adressLine", restaurantData.addressLine);
    formData.append("openingHours", restaurantData.openingHours);
    formData.append("closingHours", restaurantData.closingHours);
    formData.append("priceRange", restaurantData.priceRange);

    const additionalInfo = restaurantData.additionalInfo;
    for (const key in additionalInfo) {
      formData.append(`additionalInfo[${key}]`, additionalInfo[key]);
    }

    images?.forEach((img) => {
      formData.append("photos", img);
    });
    mutate({ locationId: locationId, formData: formData });
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
        message: "Restaurant has been addded!",
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
        <InputComponent
          label="Full Address"
          type="text"
          name="addressLine"
          handleChange={handleChange}
          value={restaurantData.addressLine}
          size={6}
        />
        <InputComponent
          label="Price Range"
          type="text"
          name="priceRange"
          handleChange={handleChange}
          value={restaurantData.priceRange}
          size={6}
        />
        <InputComponent
          label="Opening Hours"
          type="text"
          name="openniHours"
          handleChange={handleChange}
          value={restaurantData.openingHours}
          size={3}
        />
        <InputComponent
          label="Closing Hours"
          type="text"
          name="closingHours"
          handleChange={handleChange}
          value={restaurantData.closingHours}
          size={3}
        />
        <TextareaComponent
          label="Description"
          type="textarea"
          name="description"
          handleChange={handleChange}
          value={restaurantData.description}
          size={12}
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
          size={4}
        />
        <InputComponent
          label="Phone Number"
          type="text"
          name="phone"
          handleChange={handleChange}
          value={restaurantData.additionalInfo.phone}
          size={4}
        />

        <FileUploadComponent
          buttonText="Add Photos"
          name="photos"
          size={4}
          handleChange={handleFileUpload}
        />

        <Grid item xs={12}>
          <ImageList sx={{ width: "100%" }} cols={3}>
            {images?.map((file) => {
              return (
                <ImageListItem key={file?.name} sx={{ maxWidth: "250px" }}>
                  <img src={URL.createObjectURL(file)} alt={file?.name} />
                </ImageListItem>
              );
            })}
          </ImageList>
        </Grid>

        <Grid item xs={12}>
          {isPending ? (
            <Button type="button" variant="contained" color="info" disabled>
              Please Wait...
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Add Restaurant
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};
