import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  TextField,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  FormFieldValue,
  IFormField,
} from "../../../../domain/entities/FormField";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { RenderFormField } from "../../FormField/RenderFormField";
import { VinculoRepositoryDatabase } from "../../../../infra/repository/VinculoRepositoryDatabase";
import { Vinculo } from "../../../../domain/entities/Vinculo";
import { useSelector } from "react-redux";
import { RootState } from "../../../../application/store/configureStore";
import { getCompanyInfo } from "../../../../application/service/getUserCompanyInfo";
import { useVinculoFormFields } from "./useVinculoFormFields";
import { selectCurrentRelatedCompanyId } from "../../../../infra/services/selectCurrentRelatedCompanyId";

type Props = {};

const makeInitialFormState = (formFields: IFormField[]) => {
  let state: any = {};
  for (const field of formFields) {
    state[field.label] = "";
  }
  return state;
};

export const RegisterVinculoForm: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [companyName, setCompanyName] = useState("");
  const [ftFilter, setFtFilter] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");
  const [driverFilter, setDriverFilter] = useState("");
  const [driver2Filter, setDriver2Filter] = useState("");
  const [itineraryFilter, setItineraryFilter] = useState("");
  let vinculoFields = useVinculoFormFields();
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const startState = () =>
    setState(
      //@ts-ignore
      makeInitialFormState([{ label: "Ficha Técnica" }, ...vinculoFields])
    );

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

  const onFtFilterChange = (event: any) => {
    setFtFilter(event.target.value);
  };

  const onVehicleFilterChange = (event: any) => {
    setVehicleFilter(event.target.value);
  };

  const onDriverFilterChange = (event: any) => {
    setDriverFilter(event.target.value);
  };

  const onDriver2FilterChange = (event: any) => {
    setDriver2Filter(event.target.value);
  };

  const onItineraryFilterChange = (event: any) => {
    setItineraryFilter(event.target.value);
  };

  const onSave = async () => {
    try {
      const newState = {
        ...state,
        "Motorista 2":
          state["Motorista 2"] === "Nenhum" ? "" : state["Motorista 2"],
      };

      const vinculo = new Vinculo({ Transportadora: companyName, ...newState });
      const repo = new VinculoRepositoryDatabase();

      const companyId = selectCurrentRelatedCompanyId();
      if (!companyId)
        throw new Error(
          "Id de transportadora não identificado! Impossível salvar vínculo!"
        );
      await repo.addVinculo(vinculo, companyId);
      setSuccessMessage("Vinculo cadastrado!");
      startState();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const getCompanyId = () => {
    const companyId = selectCurrentRelatedCompanyId();
    if (!companyId) {
      //@ts-ignore
      window.location = "/vinculo";
      return "Erro! Volte para a página de vínculo!";
    }
    return companyId;
  };

  const getCompanyName = async (companyId: string) => {
    const info = await getCompanyInfo(companyId);
    return info!.Transportadora;
  };

  const withFilteredOptions = (field: IFormField, filter: string) => {
    const newOptions = field.options?.filter((o) => o.includes(filter));
    return { ...field, options: newOptions };
  };

  useEffect(() => {
    const func = async () => {
      const id = getCompanyId();
      const name = await getCompanyName(id!);
      setCompanyName(name);
    };
    func();
  }, [adminSelectedCompanyId, userCompanyId]);

  return (
    <Card sx={{ width: "400px", padding: "10px" }}>
      <CardHeader title="Cadastro de Vínculo" subheader="" />
      {/* filtro e field de ft */}
      <Box sx={{ mb: "10px" }}>
        <TextField
          id="ftFilter"
          label="Filtro de Ficha Técnica"
          size="small"
          value={ftFilter}
          onChange={onFtFilterChange}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <RenderFormField
          field={withFilteredOptions(vinculoFields[0], ftFilter)}
          onChange={onChange}
          value={state[vinculoFields[0].label]}
          helpertText={
            !state[vinculoFields[0].label] ? vinculoFields[0].helpertText : ""
          }
        />
      </Box>

      {/* field transportadora que é disabled */}
      <Box sx={{ mb: "10px" }}>
        <TextField
          id="transportadora"
          label="Transportadora"
          value={companyName}
          onChange={() => {}}
          disabled
          fullWidth
        />
      </Box>

      {/* filtro e field de veículo */}
      <Box sx={{ mb: "10px" }}>
        <TextField
          id="vehicleFilter"
          label="Filtro de Veículo"
          size="small"
          value={vehicleFilter}
          onChange={onVehicleFilterChange}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <RenderFormField
          field={withFilteredOptions(vinculoFields[1], vehicleFilter)}
          onChange={onChange}
          value={state[vinculoFields[1].label]}
          helpertText={
            !state[vinculoFields[1].label] ? vinculoFields[1].helpertText : ""
          }
        />
      </Box>

      {/* filtro e field de motorista*/}
      <Box sx={{ mb: "10px" }}>
        <TextField
          id="driverFilter"
          label="Filtro de Motorista"
          size="small"
          value={driverFilter}
          onChange={onDriverFilterChange}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <RenderFormField
          field={withFilteredOptions(vinculoFields[2], driverFilter)}
          onChange={onChange}
          value={state[vinculoFields[2].label]}
          helpertText={
            !state[vinculoFields[2].label] ? vinculoFields[2].helpertText : ""
          }
        />
      </Box>

      {/* filtro e field de motorista 2 */}
      <Box sx={{ mb: "10px" }}>
        <TextField
          id="driver2Filter"
          label="Filtro de Motorista 2"
          size="small"
          value={driver2Filter}
          onChange={onDriver2FilterChange}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <RenderFormField
          field={withFilteredOptions(vinculoFields[3], driver2Filter)}
          onChange={onChange}
          value={state[vinculoFields[3].label]}
          helpertText={
            !state[vinculoFields[3].label] ? vinculoFields[3].helpertText : ""
          }
        />
      </Box>

      {/* filtro e field de plano de viagem */}
      <Box sx={{ mb: "10px" }}>
        <TextField
          id="itineraryFilter"
          label="Filtro de Plano de Viagem"
          size="small"
          value={itineraryFilter}
          onChange={onItineraryFilterChange}
        />
      </Box>
      <Box sx={{ mb: "10px" }}>
        <RenderFormField
          field={withFilteredOptions(vinculoFields[4], itineraryFilter)}
          onChange={onChange}
          value={state[vinculoFields[4].label]}
          helpertText={
            !state[vinculoFields[4].label] ? vinculoFields[4].helpertText : ""
          }
        />
      </Box>
      {/* 
      {vinculoFields.slice(4).map((field: IFormField) => {
        return (
          <Box sx={{ mb: "10px" }} key={field.id}>
            <RenderFormField
              field={field}
              onChange={onChange}
              value={state[field.label]}
              helpertText={!state[field.label] ? field.helpertText : ""}
            />
          </Box>
        );
      })} */}

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onSave}
        >
          Salvar
        </Button>
      </CardActions>
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity="warning">
        {error}
      </AlertSnackbar>
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity="success"
      >
        {successMessage}
      </AlertSnackbar>
    </Card>
  );
};
