import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import {
  RestaurantMenu,
  AttachMoney,
  Style,
  Checkroom,
  Person,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../requests/axios";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#f97316", // orange-400 equivalent
    },
    background: {
      default: "#f8fafc", // gray-50 equivalent
    },
  },
});

// Styled components
const SavingsChip = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff7ed", // orange-50 equivalent
  padding: theme.spacing(1, 2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const TimeSlotButton = styled(Button)(({ active }) => ({
  minWidth: "auto",
  padding: "6px 12px",
  backgroundColor: active ? "#f97316" : "#e2e8f0",
  color: active ? "#ffffff" : "#64748b",
  "&:hover": {
    backgroundColor: active ? "#f97316" : "#e2e8f0",
  },
}));

const RestaurantCard = ({ restaurant }) => {
  const timeSlots = [
    { label: "09:30", active: true },
    { label: "10:15", active: false },
    { label: "11:15", active: true },
  ];

  const featuredImage =
    restaurant.assets.find((asset) => asset.isFeatured)?.photoURL ||
    restaurant.assets[0]?.photoURL;

  return (
    <Card elevation={1}>
      <CardMedia
        component="img"
        height="200"
        image={featuredImage}
        alt={restaurant.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {restaurant.addressLine}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {restaurant.openingHours} - {restaurant.closingHours}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          {timeSlots.map((time, index) => (
            <TimeSlotButton
              key={index}
              variant="contained"
              disableElevation
              active={time.active ? 1 : 0}
            >
              {time.label}
            </TimeSlotButton>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [savings] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      const publicRestaurant = await axiosInstance.get(
        `http://localhost:3000/api/restaurant/site/${id}`
      );
      setRestaurant(publicRestaurant.data.data);
    };
    fetchData();
  }, []);

  let content = null;

  if (restaurant) {
    const {
      id,
      name,
      description,
      addressLine,
      openingHours,
      closingHours,
      priceRange,
      bookingDuration,
      cuisines,
      diningStyle,
      dressCode,
      parkingDetails,
      executiveChef,
      paymentOptions,
      website,
      phone,
      locationId,
      assets,
    } = restaurant;

    const timeSlots = [
      { label: "09:30", active: true },
      { label: "10:15", active: false },
      { label: "11:15", active: true },
    ];

    const featuredImage =
      assets.find((asset) => asset.isFeatured)?.photoURL ||
      assets[0]?.photoURL ||
      "/api/placeholder/400/300";

    content = (
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
          {/* Header */}
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar>
              <Container maxWidth="lg">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" component="div">
                    <Box component="span" sx={{ color: "primary.main" }}>
                      Table
                    </Box>
                    Booker
                  </Typography>
                  <SavingsChip>
                    <Typography variant="body2">Your Savings</Typography>
                    <Typography
                      variant="body2"
                      color="primary.main"
                      fontWeight="bold"
                    >
                      {savings} Dollars
                    </Typography>
                  </SavingsChip>
                </Box>
              </Container>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
              {/* Restaurant List */}
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  Our Restaurants
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <RestaurantCard restaurant={restaurant} />
                  </Grid>
                </Grid>
              </Grid>

              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Restaurant Details
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {[
                      {
                        label: "Cuisine",
                        value: cuisines,
                        icon: <RestaurantMenu sx={{ color: "primary.main" }} />,
                      },
                      {
                        label: "Price Range",
                        value: priceRange,
                        icon: <AttachMoney sx={{ color: "primary.main" }} />,
                      },
                      {
                        label: "Dining Style",
                        value: diningStyle,
                        icon: <Style sx={{ color: "primary.main" }} />,
                      },
                      {
                        label: "Dress Code",
                        value: dressCode,
                        icon: <Checkroom sx={{ color: "primary.main" }} />,
                      },
                      {
                        label: "Executive Chef",
                        value: executiveChef,
                        icon: <Person sx={{ color: "primary.main" }} />,
                      },
                    ].map((detail, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        {detail.icon}
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {detail.label}
                          </Typography>
                          <Typography variant="body2">
                            {detail.value}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                    <Divider />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Contact
                      </Typography>
                      <Typography variant="body2">{phone}</Typography>
                      <Typography variant="body2">{website}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    );

    return content;
  }
};

export default RestaurantDetails;
