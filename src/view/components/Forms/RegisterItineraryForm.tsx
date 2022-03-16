import { Box, Button, Card, CardActions, CardHeader } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { FormFieldValue, IFormField } from '../../../domain/entities/FormField';
import { AlertSnackbar } from '../Common/AlertSnackbar';
import { RenderFormField } from '../FormField/RenderFormField';
import { ItineraryRepositoryDatabase } from '../../../infra/repository/ItineraryRepositoryDatabase';
import { Itinerary } from '../../../domain/entities/Itinerary';

type Props = {};

const makeInitialFormState = (formFields: IFormField[]) => {
  let state: any = {};
  for (const field of formFields) {
    state[field.label] = '';
  }
  return state;
};

export const RegisterItineraryForm: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  //   'Sequencia',
  //   'PontoDeParada',
  //   'Km',
  //   'Chegada',
  //   'Partida',
  //   'Serviço',
  //   'Espera',
  //   'Livre',
  //   'Horas',
  //   'Serviços',
  //   'Endereço',

  const itineraryFields: IFormField[] = [
    { label: 'Sequencia', type: 'Short Text', id: 0, index: 0 },
    { label: 'PontoDeParada', type: 'Short Text', id: 1, index: 1 },
    { label: 'Chegada', type: 'Date and Time', id: 2, index: 2 },
    { label: 'Partida', type: 'Date and Time', id: 3, index: 3 },
    { label: 'Serviço', type: 'Short Text', id: 4, index: 4 },
    { label: 'Espera', type: 'Short Text', id: 5, index: 5 },
    { label: 'Livre', type: 'Short Text', id: 6, index: 6 },
    { label: 'Horas', type: 'Short Text', id: 7, index: 7 },
    { label: 'Serviços', type: 'Short Text', id: 8, index: 8 },
    { label: 'Endereço', type: 'Short Text', id: 9, index: 9 },
  ];

  const startState = () => setState(makeInitialFormState(itineraryFields));

  useEffect(() => {
    startState();
  }, []);

  const onChange = (label: string, value: FormFieldValue) => {
    setState({ ...state, [label]: value });
  };

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async () => {
    try {
      const itinerary = new Itinerary(state);
      const repo = new ItineraryRepositoryDatabase();
      await repo.addItinerary(itinerary);
      setSuccessMessage('Itinerário cadastrado!');
      startState();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{ width: '400px', padding: '10px' }}>
      <CardHeader title='Cadastro de Itinerário' subheader='' />
      {itineraryFields.map((field: IFormField) => {
        return (
          <Box sx={{ mb: '10px' }} key={field.id}>
            <RenderFormField
              field={field}
              onChange={onChange}
              value={state[field.label]}
            />
          </Box>
        );
      })}

      <CardActions>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={onSave}
        >
          Salvar
        </Button>
      </CardActions>
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity='warning'>
        {error}
      </AlertSnackbar>
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity='success'
      >
        {successMessage}
      </AlertSnackbar>
    </Card>
  );
};
