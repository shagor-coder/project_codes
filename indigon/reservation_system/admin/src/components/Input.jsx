import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export const InputComponent = ({
  label,
  name,
  type,
  handleChange,
  value,
  autoComplete,
  size,
}) => {
  return (
    <Grid item xs={12} md={size}>
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

export const TextareaComponent = ({
  label,
  name,
  type,
  handleChange,
  value,
  size,
}) => {
  return (
    <Grid item xs={12} md={size}>
      <TextField
        fullWidth
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        required
        multiline
      />
    </Grid>
  );
};

export const SelectComponent = ({
  label,
  name,
  handleChange,
  value,
  options,
  size,
}) => {
  return (
    <Grid item xs={12} md={size}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options &&
            options.map((option) => {
              return (
                <MenuItem value={option?.value} key={option.value}>
                  {option?.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Grid>
  );
};
