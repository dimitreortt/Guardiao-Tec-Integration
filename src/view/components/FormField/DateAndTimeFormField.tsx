import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import { FormFieldStrategyProps } from './Types';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export const DateAndTimeFormField: FunctionComponent<
  FormFieldStrategyProps
> = ({ label, onChange, value }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(params) => <TextField {...params} fullWidth />}
        value={value ? value : null}
        label={label}
        onChange={(newValue) => {
          onChange(label, newValue ? newValue : new Date());
        }}
      />
    </LocalizationProvider>
  );
};
