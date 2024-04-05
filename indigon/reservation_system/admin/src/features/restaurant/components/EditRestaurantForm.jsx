import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import {
  FileUploadComponent,
  InputComponent,
  TextareaComponent,
} from "../../../components/Input";
import { useEffect, useState } from "react";
import { useEditRestaurant } from "../services/restaurant";
import { UseAuthContext } from "../../../context/AuthContext";

export const EditRestaurantForm = ({ data: currentData }) => {
  const [images, setImages] = useState([]);
  const [newFeaturedImage, setNewFeaturedImage] = useState(null);
  const { edited, isEditPending, isEditError, mutate, error } =
    useEditRestaurant();
  const { dispatch } = UseAuthContext();

  const {
    name,
    description,
    addressLine,
    priceRange,
    openingHours,
    closingHours,
    additionalInfo,
    bookingDuration,
    featuredImage,
    photos,
  } = currentData;

  const {
    cuisines,
    diningStyle,
    dressCode,
    parkingDetails,
    executiveChef,
    paymentOptions,
    website,
    phone,
  } = additionalInfo;

  const [restaurantData, setRestaurantData] = useState({
    name: name,
    description: description,
    addressLine: addressLine,
    priceRange: priceRange,
    openingHours: openingHours,
    closingHours: closingHours,
    bookingDuration: bookingDuration,
    additionalInfo: {
      cuisines: cuisines,
      diningStyle: diningStyle,
      dressCode: dressCode,
      parkingDetails: parkingDetails,
      executiveChef: executiveChef,
      paymentOptions: paymentOptions,
      website: website,
      phone: phone,
    },
  });

  const handleFileUpload = (event) => {
    const { files, name } = event.target;
    if (name === "newFeaturedImage") return setNewFeaturedImage(files[0]);
    setImages((prevState) => {
      return [...Array.from(prevState), ...Array.from(files)];
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (
      name === "name" ||
      name === "description" ||
      name === "openingHours" ||
      name === "closingHours" ||
      name === "bookingDuration" ||
      name === "priceRange"
    ) {
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
    formData.append("addressLine", restaurantData.addressLine);
    formData.append("openingHours", restaurantData.openingHours);
    formData.append("closingHours", restaurantData.closingHours);
    formData.append("priceRange", restaurantData.priceRange);
    formData.append("bookingDuration", restaurantData.bookingDuration);

    const additionalInfo = restaurantData.additionalInfo;
    for (const key in additionalInfo) {
      formData.append(`additionalInfo[${key}]`, additionalInfo[key]);
    }

    images?.forEach((img) => {
      formData.append("photos", img);
    });

    formData.append("newFeaturedImage", newFeaturedImage);
    mutate({ locationId: locationId, formData: formData });
  };

  useEffect(() => {
    if (isEditError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
    }
  }, [, isEditError, isEditPending, error]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Typography component="h3" variant="h5">
            Featured Image
          </Typography>
          <ImageList>
            <ImageListItem>
              <img src={featuredImage?.photoURL} />
            </ImageListItem>
          </ImageList>
          <Grid>
            <Typography component="h3" variant="h5">
              Restaurant Photos
            </Typography>
            <ImageList sx={{ wrestaurantIdth: "100%" }} cols={3}>
              {photos?.map((photo) => {
                return (
                  <ImageListItem
                    key={photo?.photoId}
                    sx={{ maxWrestaurantIdth: "250px" }}
                  >
                    <img src={photo?.photoURL} />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
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
              size={4}
            />
            <InputComponent
              label="Payment Options"
              type="text"
              name="paymentOptions"
              handleChange={handleChange}
              value={restaurantData.additionalInfo.paymentOptions}
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
              buttonText="Featured Photo"
              name="newFeaturedImage"
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
              {newFeaturedImage && (
                <ImageList sx={{ wrestaurantIdth: "100%" }} cols={3}>
                  <ImageListItem sx={{ maxWrestaurantIdth: "350px" }}>
                    <img
                      src={URL.createObjectURL(newFeaturedImage)}
                      alt={newFeaturedImage?.name}
                    />
                  </ImageListItem>
                </ImageList>
              )}
            </Grid>

            <Grid item xs={6}>
              <ImageList sx={{ wrestaurantIdth: "100%" }} cols={3}>
                {images?.map((file) => {
                  return (
                    <ImageListItem
                      key={file?.name}
                      sx={{ maxWrestaurantIdth: "350px" }}
                    >
                      <img src={URL.createObjectURL(file)} alt={file?.name} />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </Grid>

            <Grid item xs={12}>
              {isEditPending ? (
                <Button type="button" variant="contained" color="info" disabled>
                  Please Wait...
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  Update Restaurant
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
