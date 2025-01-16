import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
  FileUploadComponent,
  InputComponent,
  TextareaComponent,
} from "../../../components/Input";
import { UseAuthContext } from "../../../context/AuthContext";
import {
  useDeleteRestaurantFeaturedImage,
  useDeleteRestaurantImage,
  useEditRestaurant,
  useGetCurrentRestaurant,
} from "../services/restaurant";
import { useParams } from "react-router-dom";

const restaurantFormData = {
  id: "",
  name: "",
  description: "",
  addressLine: "",
  priceRange: "",
  openingHours: "",
  closingHours: "",
  bookingDuration: "",
  assets: [],
  cuisines: "",
  diningStyle: "",
  dressCode: "",
  parkingDetails: "",
  executiveChef: "",
  paymentOptions: "",
  website: "",
  phone: "",
};

export const EditRestaurantForm = () => {
  const { restaurantId } = useParams();
  const { dispatch } = UseAuthContext();
  const [restaurantData, setRestaurantData] = useState(restaurantFormData);
  const [uploadedImages, setuploadedImages] = useState([]);
  const [newFeaturedImage, setNewFeaturedImage] = useState(null);

  const {
    data: currentRestaurantData,
    isLoading: isRestaurantLoading,
    error: restaurantError,
    isSuccess: isRestaurantSuccess,
  } = useGetCurrentRestaurant({
    restaurantId: restaurantId,
  });

  const {
    isPending: isEditPending,
    mutate: editRestaurant,
    error: restaurantEditError,
    isSuccess: isRestaurantUpdated,
    data: updatedRestaurantData,
  } = useEditRestaurant();
  const {
    mutate: deleteImage,
    isSuccess: isRestaurantImgDeleted,
    isError: isRestaurantImgDelError,
  } = useDeleteRestaurantImage();
  const {
    mutate: deleteFeaturedImage,
    isSuccess: isRestaurantFeImgDeleted,
    isError: isRestaurantFeImgDelError,
  } = useDeleteRestaurantFeaturedImage();

  const handleFileUpload = (event) => {
    const { files, name } = event.target;
    if (name === "newFeaturedImage") return setNewFeaturedImage(files[0]);
    setuploadedImages((prevState) => {
      return [...Array.from(prevState), ...Array.from(files)];
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData((prevState) => ({
      ...prevState,
      [name]: value || "",
    }));
  };

  const handleFeaturedImageDelete = (photo) => {
    deleteFeaturedImage({
      restaurantId: restaurantId,
      photoId: photo?.photoId,
    });
  };

  const handleImageDelete = (photo) => {
    deleteImage({
      restaurantId: restaurantId,
      photoId: photo?.photoId,
      id: photo?.id,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in restaurantData) {
      formData.append(`${key}`, restaurantData[key]);
    }
    uploadedImages?.forEach((img) => {
      formData.append("photos", img);
    });
    formData.append("featuredImage", newFeaturedImage);
    editRestaurant({ restaurantId: restaurantId, formData: formData });
  };

  useEffect(() => {
    if (restaurantEditError || restaurantError) {
      dispatch({
        type: "showToast",
        message: error.message,
        toastType: "error",
      });
    }
    if (isRestaurantUpdated) {
      dispatch({
        type: "showToast",
        message: "Restaurant updated successfully!",
        toastType: "success",
      });
    }
    if (isRestaurantImgDeleted || isRestaurantFeImgDeleted) {
      dispatch({
        type: "showToast",
        message: "Image deleted successfully!",
        toastType: "success",
      });
    }

    if (isRestaurantSuccess) {
      console.log(currentRestaurantData, "====Current Restaurant");
      setRestaurantData(currentRestaurantData);
    }
  }, [
    isRestaurantFeImgDelError,
    isRestaurantFeImgDeleted,
    isRestaurantImgDeleted,
    isRestaurantImgDelError,
    isRestaurantUpdated,
    isRestaurantSuccess,
    updatedRestaurantData,
  ]);

  let content = null;

  if (isRestaurantLoading)
    content = (
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isRestaurantLoading}>
        <CircularProgress color="info" />
      </Backdrop>
    );
  if (currentRestaurantData) {
    const oldFeaturedImage = restaurantData?.assets?.find(
      (as) => as.isFeatured
    );
    const oldPhotos = restaurantData?.assets?.filter((as) => !as.isFeatured);

    content = (
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Typography component="h3" variant="h5">
            Featured Image
          </Typography>
          {oldFeaturedImage && (
            <ImageList>
              <ImageListItem
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={oldFeaturedImage?.photoURL}
                  alt={"Featured Image"}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={() => {
                    handleFeaturedImageDelete(oldFeaturedImage);
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "primary.main",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ImageListItem>
            </ImageList>
          )}
          <Grid>
            <Typography component="h3" variant="h5">
              Restaurant Photos
            </Typography>
            {oldPhotos && (
              <ImageList sx={{ wrestaurantIdth: "100%" }} cols={3}>
                {oldPhotos?.map((photo) => {
                  return (
                    <ImageListItem
                      key={photo?.photoId}
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={photo?.photoURL}
                        alt={photo?.photoId}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        onClick={() => handleImageDelete(photo)}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          color: "primary.main",
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ImageListItem>
                  );
                })}
              </ImageList>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <InputComponent
                  label="Name"
                  type="text"
                  name="name"
                  handleChange={handleChange}
                  value={restaurantData?.name}
                  size={6}
                />
                <InputComponent
                  label="Full Address"
                  type="text"
                  name="addressLine"
                  handleChange={handleChange}
                  value={restaurantData?.addressLine}
                  size={6}
                />
                <InputComponent
                  label="Price Range"
                  type="text"
                  name="priceRange"
                  handleChange={handleChange}
                  value={restaurantData?.priceRange}
                  size={6}
                />
                <InputComponent
                  label="Opening Hours"
                  type="text"
                  name="openingHours"
                  handleChange={handleChange}
                  value={restaurantData?.openingHours}
                  size={3}
                />
                <InputComponent
                  label="Closing Hours"
                  type="text"
                  name="closingHours"
                  handleChange={handleChange}
                  value={restaurantData?.closingHours}
                  size={3}
                />
                <TextareaComponent
                  label="Description"
                  type="textarea"
                  name="description"
                  handleChange={handleChange}
                  value={restaurantData?.description}
                  size={12}
                />
                <InputComponent
                  label="Cuisines"
                  type="text"
                  name="cuisines"
                  handleChange={handleChange}
                  value={restaurantData?.cuisines}
                  size={6}
                />
                <InputComponent
                  label="Dinig Styles"
                  type="text"
                  name="diningStyle"
                  handleChange={handleChange}
                  value={restaurantData?.diningStyle}
                  size={6}
                />
                <InputComponent
                  label="Dress Code"
                  type="text"
                  name="dressCode"
                  handleChange={handleChange}
                  value={restaurantData?.dressCode}
                  size={6}
                />
                <InputComponent
                  label="Parking Details"
                  type="text"
                  name="parkingDetails"
                  handleChange={handleChange}
                  value={restaurantData?.parkingDetails}
                  size={6}
                />
                <InputComponent
                  label="Executive Chef"
                  type="text"
                  name="executiveChef"
                  handleChange={handleChange}
                  value={restaurantData?.executiveChef}
                  size={4}
                />
                <InputComponent
                  label="Payment Options"
                  type="text"
                  name="paymentOptions"
                  handleChange={handleChange}
                  value={restaurantData?.paymentOptions}
                  size={4}
                />
                <InputComponent
                  label="Booking Duration in minutes"
                  type="text"
                  name="bookingDuration"
                  handleChange={handleChange}
                  value={restaurantData?.bookingDuration}
                  size={4}
                />
                <InputComponent
                  label="Website"
                  type="text"
                  name="website"
                  handleChange={handleChange}
                  value={restaurantData?.website}
                  size={6}
                />
                <InputComponent
                  label="Phone Number"
                  type="text"
                  name="phone"
                  handleChange={handleChange}
                  value={restaurantData?.phone}
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
                    <ImageList sx={{ width: "100%" }} cols={3}>
                      <ImageListItem sx={{ maxWidth: "350px" }}>
                        <img
                          src={URL.createObjectURL(newFeaturedImage)}
                          alt={newFeaturedImage?.name}
                        />
                      </ImageListItem>
                    </ImageList>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <ImageList sx={{ width: "100%" }} cols={3}>
                    {uploadedImages?.map((file) => {
                      return (
                        <ImageListItem
                          key={file?.name}
                          sx={{ maxWidth: "350px" }}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file?.name}
                          />
                        </ImageListItem>
                      );
                    })}
                  </ImageList>
                </Grid>

                <Grid item xs={12}>
                  {isEditPending ? (
                    <Button
                      type="button"
                      variant="contained"
                      color="info"
                      disabled
                    >
                      Please Wait...
                    </Button>
                  ) : (
                    <Button type="submit" variant="contained" color="primary">
                      Update Restaurant
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return <>{content}</>;
};
