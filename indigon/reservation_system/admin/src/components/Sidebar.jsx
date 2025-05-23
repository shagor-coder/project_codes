import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { ProfileMenu } from "./ProfileMenu";
import { MenuItem } from "./MenuItem";
import { useState } from "react";
import { UseAuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

export const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Sidebar = ({ headline }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { auth } = UseAuthContext();
  const { isAdmin } = auth?.authUser;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeLink = (linkName) => {
    return pathname.includes(linkName) ? true : false;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {headline}
          </Typography>
          {/* Right Dropdown Menu */}
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Sidebar Menus */}
        <List>
          <MenuItem
            icon={<DashboardIcon />}
            name="Dashboard"
            path="/dashboard"
            isActive={activeLink("/dashboard")}
          />
          {/* Admin visible */}
          {isAdmin && (
            <MenuItem
              icon={<PeopleAltIcon />}
              name="Users"
              path="/users"
              isActive={activeLink("/users")}
            />
          )}
          <MenuItem
            icon={<LocationCityIcon />}
            name="Locations"
            path="/locations"
            isActive={activeLink("/locations")}
          />
          <MenuItem
            icon={<DinnerDiningIcon />}
            name="Restaurants"
            path="/restaurants"
            isActive={activeLink("/restaurants")}
          />
          <MenuItem
            icon={<BookOnlineIcon />}
            name="Bookings"
            path="/bookings"
            isActive={activeLink("/bookings")}
          />
        </List>
      </Drawer>
    </Box>
  );
};
