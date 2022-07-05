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

  const withFilteredOptions = (field: IFormField) => {
    const newOptions = field.options?.filter((o) => o.includes(ftFilter));
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
          field={withFilteredOptions(vinculoFields[0])}
          onChange={onChange}
          value={state[vinculoFields[0].label]}
          helpertText={
            !state[vinculoFields[0].label] ? vinculoFields[0].helpertText : ""
          }
        />
      </Box>
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
      {vinculoFields.slice(1).map((field: IFormField) => {
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
      })}

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
