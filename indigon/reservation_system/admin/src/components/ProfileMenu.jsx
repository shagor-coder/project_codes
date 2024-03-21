import { Avatar, Box, IconButton, Menu, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "./MenuItem";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

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
    // removeauthUser();
    // navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Test" src="/static/images/avatar/2.jpg" />
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
