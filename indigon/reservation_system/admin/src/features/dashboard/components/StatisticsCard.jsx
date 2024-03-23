import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { CardActionArea, CardActions } from "@mui/material";

export const StatisticsCard = ({ headline, total, path }) => {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ textTransform: "uppercase" }}
          fontWeight="bold"
        >
          {headline}
        </Typography>
        <Typography variant="h5" color="textPrimary">
          {total}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={path} color="primary" style={{ textTransform: "lowercase" }}>
          <CardActionArea sx={{ padding: 1 }}>Go to {headline}</CardActionArea>
        </Link>
      </CardActions>
    </Card>
  );
};
