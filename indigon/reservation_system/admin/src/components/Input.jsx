import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
        minRows={4}
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const FileUploadComponent = ({
  name,
  buttonText,
  handleChange,
  size,
}) => {
  return (
    <Grid item xs={12} md={size}>
      <Button
        sx={{ width: "100%", height: "56px" }}
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {buttonText}
        <VisuallyHiddenInput
          name={name}
          onChange={handleChange}
          type="file"
          multiple={true}
          accept="image/*"
        />
      </Button>
    </Grid>
  );
};
