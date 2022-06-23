import React, { FunctionComponent, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { BaseForm } from "../Base/BaseForm";
import { driverFormFields } from "./driverFormFields";

type Props = {
  onSave: (state: any, setState?: any) => void;
  initialState?: object;
  appendice?: any;
};

export const BaseDriverForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
  appendice,
}) => {
  return (
    <div>
      <BaseForm
        appendice={appendice}
        onSave={onSave}
        initialState={initialState}
        formFields={driverFormFields()}
        formTitle="Editar Motorista"
      />
    </div>
  );
};
