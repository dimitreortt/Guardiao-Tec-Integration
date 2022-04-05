import React, { FunctionComponent } from 'react';
import { BaseForm } from '../Base/BaseForm';
import { ftFormFields } from './ftFormFields';

type Props = {
  onSave: (state: any, setState?: any) => void;
  initialState?: object;
};

export const BaseFTForm: FunctionComponent<Props> = ({
  onSave,
  initialState,
}) => {
  return (
    <div>
      <BaseForm
        onSave={onSave}
        initialState={initialState}
        formFields={ftFormFields()}
        formTitle='Editar Ficha Técnica'
      />
    </div>
  );
};
