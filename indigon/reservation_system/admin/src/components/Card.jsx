import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

export const CardComponent = ({ headline, cardcontent }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Typography
            textAlign="center"
            variant="h1"
            color={blue.A200}
            fontSize="40px"
          >
            {headline}
          </Typography>
        }
      />
      <CardContent>{cardcontent}</CardContent>
    </Card>
  );
};
