import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import { Avatar, Box, IconButton, Menu, Tooltip } from "@mui/material";
import { useState } from "react";
import { UseAuthContext, useAppQueryClient } from "../context/AuthContext";
import { handleLogout } from "../requests/authentication/auth";
import { MenuItem } from "./MenuItem";

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { dispatch, auth } = UseAuthContext();
  const queryClient = useAppQueryClient();

  //   Handle the right menu open
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  //   Handle the right menu close
  const handleCloseUserMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(null);
  };

  //   Logout current user
  const logOutUser = async () => {
    try {
      await handleLogout();

      queryClient.clear();

      dispatch({
        type: "logout",
        data: null,
      });
    } catch (error) {
      dispatch({
        type: "showToast",
        message: "Couldn't log out!",
        toastType: "error",
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            src=""
            alt={auth && auth.authUser ? auth.authUser.name : "John Doe"}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          icon={<PeopleAlt />}
          name="Profile"
          path="/profile"
          handleClick={handleCloseUserMenu}
        />
        <MenuItem
          icon={<LogoutIcon />}
          name="Logout"
          handleClick={logOutUser}
        />
      </Menu>
    </Box>
  );
};
