import React, { FunctionComponent } from "react";
import TextField from "@mui/material/TextField";
import { FormFieldStrategyProps } from "./Types";

export const NumberFormField: FunctionComponent<FormFieldStrategyProps> = ({
  label,
  onChange,
  value,
}) => {
  return (
    <TextField
      label={label}
      value={value || ""}
      type="number"
      variant="outlined"
      onChange={(e) => onChange(label, e.target.value)}
      fullWidth
    />
  );
};
