import { FormFieldValue } from "./../../../domain/entities/FormField";

export type FormFieldStrategyProps = {
  label: string;
  options?: string[];
  onChange: (label: string, value: FormFieldValue) => void;
  value?: any;
  helperText?: string;
};
