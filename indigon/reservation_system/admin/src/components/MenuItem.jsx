import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";

export const MenuItem = ({ path, icon, name, handleClick, isActive }) => {
  return (
    <Tooltip title={name} placement="right">
      <ListItem disablePadding sx={{ display: "block" }} onClick={handleClick}>
        <Link to={path} style={{ color: "#0000006e" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: !isActive ? "#000000e6" : "seagreen",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={name}
              sx={{
                opacity: open ? 1 : 0,
                color: !isActive ? "#000000e6" : "seagreen",
              }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
    </Tooltip>
  );
};
