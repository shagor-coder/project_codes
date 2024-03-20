import { Box, Typography, colors } from "@mui/material";

export const PagesHeader = ({ headline, IconButton }) => {
  return (
    <Box
      component="section"
      padding={1}
      bgcolor={colors.grey[200]}
      marginBottom={2}
      borderRadius={1}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box component="div">
        <Typography variant="h5">{headline}</Typography>
      </Box>
      <Box component="div">{IconButton}</Box>
    </Box>
  );
};
