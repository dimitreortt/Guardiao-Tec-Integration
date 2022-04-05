import React, { FunctionComponent } from 'react';
import { BaseForm } from '../Base/BaseForm';
import { useItineraryFormFields } from './useItineraryFormFields';

type Props = {
  onSave: (state: any, setState?: any) => void;
  initialState?: object;
};

export const BaseItineraryForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
}) => {
  const itineraryFields = useItineraryFormFields();

  return (
    <div>
      <BaseForm
        onSave={onSave}
        initialState={initialState}
        formFields={itineraryFields}
        formTitle='Editar Plano de Viagem'
      />
    </div>
  );
};
