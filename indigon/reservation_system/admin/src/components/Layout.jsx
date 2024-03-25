import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children, headline }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar headline={headline} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        {children}
      </Box>
    </Box>
  );
};
