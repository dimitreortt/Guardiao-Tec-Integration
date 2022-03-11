import React, { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormFieldStrategyProps } from './Types';
import { isValidCPF } from './utils/isValidCPF';

export const CPFFormField: FunctionComponent<FormFieldStrategyProps> = ({ label, onChange }) => {
  const [helperText, setHelperText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (helperText) setHelperText('');
    onChange(label, value);
  };

  const handleLoseFocus = (event: any) => {
    const value = event.target.value;
    if (!isValidCPF(value)) {
      setHelperText('Invalid CPF');
    }
  };

  return (
    <TextField
      label={label}
      variant='outlined'
      onChange={handleChange}
      helperText={helperText}
      error={!!helperText}
      onBlur={handleLoseFocus}
      fullWidth
    />
  );
};
