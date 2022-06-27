import React, { FunctionComponent } from "react";
import TextField from "@mui/material/TextField";
import { FormFieldStrategyProps } from "./Types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const ListSelectionFormField: FunctionComponent<
  FormFieldStrategyProps
> = ({ label, options, onChange, value, helperText }) => {
  // const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    // setValue(event.target.value);
    onChange(label, event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} fullWidth>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value || ""}
        label={label}
        onChange={handleChange}
        fullWidth
      >
        {options &&
          options.map((option: string) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
