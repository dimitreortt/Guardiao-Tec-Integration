import React, { FunctionComponent } from "react";
import { FT } from "../../../../domain/entities/FT";
import { CheckboxFormField } from "../../FormField/CheckboxFormField";
import { DateFormField } from "../../FormField/DateFormField";
import { ShortTextFormField } from "../../FormField/ShortTextFormField";
import { ftFormFields } from "./ftFormFields";

type Props = {
  targetField: string;
  ft: FT;
  onInputChange: any;
  currentValue?: any;
};

export const RenderEditManyInput: FunctionComponent<Props> = ({
  targetField,
  ft,
  onInputChange,
  currentValue,
}) => {
  console.log(targetField);

  const onChange = (label: string, newValue: any) => onInputChange(newValue);
  const ffs = ftFormFields();

  const findComp = () => {
    if (targetField === "Sentido") {
      const value = currentValue ? currentValue : ft.values.Sentido;
      onChange("", value);
      return (
        <ShortTextFormField label="Sentido" onChange={onChange} value={value} />
      );
    } else if (targetField === "Data de Vigencia Inicial") {
      const value = currentValue
        ? currentValue
        : ft.values["Data de Vigencia Inicial"];
      onChange("", value);
      return (
        <DateFormField
          label="Data de Vigencia Inicial"
          onChange={onChange}
          value={value}
        />
      );
    } else if (targetField === "Frequência") {
      const value = currentValue ? currentValue : ft.values["Frequência"];
      onChange("", value);
      return (
        <CheckboxFormField
          label="Frequência"
          onChange={onChange}
          value={value}
          options={ffs[6].options}
        />
      );
    }
  };

  const comp = findComp();

  return <div>{comp}</div>;
};
