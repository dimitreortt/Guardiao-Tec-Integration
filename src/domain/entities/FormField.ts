export type FormFieldType =
  | "Short Text"
  | "Long Text"
  | "Date"
  | "Time"
  | "Date and Time"
  | "Year"
  | "CPF"
  | "CNPJ"
  | "List Selection"
  | "Checkbox"
  | "Phone Number"
  | "Email"
  | "File"
  | "Number";

export type FormFieldValue = string | string[] | File | Date;

export type IFormField = {
  label: string;
  type: FormFieldType;
  id?: number;
  index?: number;
  options?: string[];
  helpertText?: string;
};
