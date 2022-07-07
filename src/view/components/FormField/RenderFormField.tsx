import React, { FunctionComponent, useState } from "react";
import { IFormField, FormFieldValue } from "../../../domain/entities/FormField";
import { RenderStrategy } from "./RenderStrategy";
import { ShortTextFormField } from "./ShortTextFormField";
import { LongTextFormField } from "./LongTextFormField";
import { DateFormField } from "./DateFormField";
import { TimeFormField } from "./TimeFormField";
import { YearFormField } from "./YearFormField";
import { EmailFormField } from "./EmailFormField";
import { CheckboxFormField } from "./CheckboxFormField";
import { ListSelectionFormField } from "./ListSelectionFormField";
import { DateAndTimeFormField } from "./DateAndTimeFormField";
import { PhoneNumberFormField } from "./PhoneNumberFormField";
import { CPFFormField } from "./CPFFormField";
import { CNPJFormField } from "./CNPJFormField";
import { NotImplementedFormFieldError } from "./NotImplementedFormFieldError";
import { NumberFormField } from "./NumberFormField";

type Props = {
  field: IFormField;
  onChange: (label: string, value: FormFieldValue) => void;
  value?: any;
  helpertText?: string;
};

export const RenderFormField: FunctionComponent<Props> = ({
  field,
  onChange,
  value,
  helpertText,
}) => {
  const getStrategyComponent = (type: string) => {
    switch (type) {
      case "Short Text":
        return ShortTextFormField;
      case "Long Text":
        return LongTextFormField;
      case "Date":
        return DateFormField;
      case "Time":
        return TimeFormField;
      case "Date and Time":
        return DateAndTimeFormField;
      case "Year":
        return YearFormField;
      case "Email":
        return EmailFormField;
      case "Checkbox":
        return CheckboxFormField;
      case "List Selection":
        return ListSelectionFormField;
      case "Phone Number":
        return PhoneNumberFormField;
      case "CPF":
        return CPFFormField;
      case "CNPJ":
        return CNPJFormField;
      case "Number":
        return NumberFormField;
      default:
        return NotImplementedFormFieldError;
    }
  };

  return (
    <RenderStrategy
      strategyComponent={getStrategyComponent(field.type)}
      field={field}
      onChange={onChange}
      value={value}
      helpertText={helpertText}
    />
  );
};
