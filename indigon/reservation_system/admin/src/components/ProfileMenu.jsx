import { Avatar, Box, IconButton, Menu, Tooltip } from "@mui/material";
import { MenuItem } from "./MenuItem";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { UseAuthContext } from "../context/AuthContext";

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { dispatch, auth } = UseAuthContext();

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
  const handleLogout = () => {
    dispatch({
      type: "logout",
      data: null,
    });
  };

  return (
    <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
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
          handleClick={handleLogout}
        />
      </Menu>
    </Box>
  );
};
