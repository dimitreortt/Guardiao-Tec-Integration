import React, { FunctionComponent } from "react";
import { BaseForm } from "../Base/BaseForm";
import { vehicleFormFields } from "./vehicleFormFields";

type Props = {
  onSave: (state: any, setState?: any) => void;
  initialState?: object;
};

export const BaseVehicleForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
}) => {
  return (
    <div>
      <BaseForm
        onSave={onSave}
        initialState={initialState}
        formFields={vehicleFormFields()}
        formTitle="Editar Vaículo"
      />
    </div>
  );
};
