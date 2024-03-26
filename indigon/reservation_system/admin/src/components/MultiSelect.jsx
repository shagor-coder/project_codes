import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export const MultiSelectComponent = ({
  options,
  handleChange,
  limit,
  name,
}) => {
  return (
    <Grid item xs={12} md={6}>
      <Autocomplete
        multiple
        limitTags={limit}
        id={name}
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="multiselect" placeholder="Favorites" />
        )}
        filterSelectedOptions
        onChange={handleChange}
      />
    </Grid>
  );
};
