import { Button, Grid, ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FileUploadComponent,
  InputComponent,
  TextareaComponent,
} from "../../../components/Input";
import { UseAuthContext } from "../../../context/AuthContext";
import { useCreateRestaurant } from "../services/restaurant";

export const AddRestaurantForm = () => {
  const { locationId } = useParams();

  const [restaurantData, setRestaurantData] = useState({
    name: "Awesome restaurant 3",
    description: "The best restaurant",
    addressLine: "123 new york",
    priceRange: "$10 - $100",
    openingHours: "9.00am",
    closingHours: "5.00pm",
    bookingDuration: "60min",
    cuisines: "American",
    diningStyle: "Casual",
    dressCode: "Casual",
    parkingDetails: "Basement",
    executiveChef: "Shagor",
    paymentOptions: "Mastercard",
    website: "https://www.acmerestaurant.com",
    phone: "+8801742677273",
  });

  const [images, setImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);

  const { data, isPending, isError, mutate, error } = useCreateRestaurant();
  const { dispatch } = UseAuthContext();

  const handleFileUpload = (event) => {
    const { files, name } = event.target;
    if (name === "featuredImage") return setFeaturedImage(files[0]);
    setImages((prevState) => {
      return [...Array.from(prevState), ...Array.from(files)];
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (const key in restaurantData) {
      formData.append(`${key}`, restaurantData[key]);
    }

    images?.forEach((img) => {
      formData.append("photos", img);
    });
    formData.append("featuredImage", featuredImage);

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
          name="openingHours"
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
          value={restaurantData.cuisines}
          size={6}
        />
        <InputComponent
          label="Dinig Styles"
          type="text"
          name="diningStyle"
          handleChange={handleChange}
          value={restaurantData.diningStyle}
          size={6}
        />
        <InputComponent
          label="Dress Code"
          type="text"
          name="dressCode"
          handleChange={handleChange}
          value={restaurantData.dressCode}
          size={6}
        />
        <InputComponent
          label="Parking Details"
          type="text"
          name="parkingDetails"
          handleChange={handleChange}
          value={restaurantData.parkingDetails}
          size={6}
        />
        <InputComponent
          label="Executive Chef"
          type="text"
          name="executiveChef"
          handleChange={handleChange}
          value={restaurantData.executiveChef}
          size={4}
        />
        <InputComponent
          label="Payment Options"
          type="text"
          name="paymentOptions"
          handleChange={handleChange}
          value={restaurantData.paymentOptions}
          size={4}
        />
        <InputComponent
          label="Booking Duration in minutes"
          type="text"
          name="bookingDuration"
          handleChange={handleChange}
          value={restaurantData.bookingDuration}
          size={4}
        />
        <InputComponent
          label="Website"
          type="text"
          name="website"
          handleChange={handleChange}
          value={restaurantData.website}
          size={6}
        />
        <InputComponent
          label="Phone Number"
          type="text"
          name="phone"
          handleChange={handleChange}
          value={restaurantData.phone}
          size={6}
        />
        <FileUploadComponent
          buttonText="Featured Photo"
          name="featuredImage"
          size={4}
          handleChange={handleFileUpload}
          multiple={false}
        />

        <FileUploadComponent
          buttonText="Add Photos"
          name="photos"
          size={8}
          handleChange={handleFileUpload}
          multiple={true}
        />

        <Grid item xs={6}>
          {featuredImage && (
            <ImageList sx={{ width: "100%" }} cols={3}>
              <ImageListItem sx={{ maxWidth: "350px" }}>
                <img
                  src={URL.createObjectURL(featuredImage)}
                  alt={featuredImage?.name}
                />
              </ImageListItem>
            </ImageList>
          )}
        </Grid>

        <Grid item xs={6}>
          <ImageList sx={{ width: "100%" }} cols={3}>
            {images?.map((file) => {
              return (
                <ImageListItem key={file?.name} sx={{ maxWidth: "350px" }}>
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
