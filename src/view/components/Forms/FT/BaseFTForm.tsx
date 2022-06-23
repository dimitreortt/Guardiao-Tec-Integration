import React, { FunctionComponent } from "react";
import { BaseForm } from "../Base/BaseForm";
import { ftFormFields } from "./ftFormFields";

type Props = {
  onSave: (state: any, setState?: any) => void;
  initialState?: object;
  appendice?: any;
};

export const BaseFTForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
  appendice,
}) => {
  return (
    <div>
      <BaseForm
        onSave={onSave}
        initialState={initialState}
        formFields={ftFormFields()}
        formTitle="Editar Ficha Técnica"
        appendice={appendice}
      />
    </div>
  );
};
