import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";

export const MenuItem = ({ path, icon, name, handleClick }) => {
  return (
    <Tooltip title={name} placement="right">
      <ListItem disablePadding sx={{ display: "block" }} onClick={handleClick}>
        <Link to={path} style={{ color: "#000000de" }}>
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
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </Link>
      </ListItem>
    </Tooltip>
  );
};
