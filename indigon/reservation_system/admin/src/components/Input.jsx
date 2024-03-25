import { Grid, TextField } from "@mui/material";

export const InputComponent = ({
  label,
  name,
  type,
  handleChange,
  value,
  autoComplete,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        required
        autoComplete={autoComplete}
      />
    </Grid>
  );
};
