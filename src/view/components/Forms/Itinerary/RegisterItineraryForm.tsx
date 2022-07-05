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
import { ItineraryRepositoryDatabase } from "../../../../infra/repository/ItineraryRepositoryDatabase";
import { Itinerary } from "../../../../domain/entities/Itinerary";
import { FT } from "../../../../domain/entities/FT";
import { fetchFTs } from "../../../../infra/services/fetchFTs";
import { useSelector } from "react-redux";
import { RootState } from "../../../../application/store/configureStore";
import { useItineraryFormFields } from "./useItineraryFormFields";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { useLTUField } from "./useLTUField";

type Props = {};

export const RegisterItineraryForm: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [ltuFilter, setLtuFilter] = useState<string>("");
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const LTUFF = useLTUField();
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const [fts, setFTs] = useState<FT[]>([]);

  useEffect(() => {
    fetchFTs(setFTs);
  }, []);

  const itineraryFields = useItineraryFormFields();

  const startState = () => {
    setState(
      makeInitialFormState([
        //@ts-ignore
        ...itineraryFields,
        //@ts-ignore
        { label: "LTU Correspondente" },
      ])
    );
  };

  useEffect(() => {
    startState();
  }, []);

  const onChange = (label: string, value: FormFieldValue) => {
    console.log(label, value);
    setState({ ...state, [label]: value });
  };

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onLtuFilterChange = (event: any) => {
    setLtuFilter(event.target.value);
  };

  const onSave = async () => {
    try {
      if (!state["LTU Correspondente"])
        throw new Error("Selecione uma LTU Correspondente");
      const itinerary = new Itinerary(state);
      const repo = new ItineraryRepositoryDatabase();
      if (isAdmin && adminSelectedCompanyId) {
        await repo.addItinerary(itinerary, adminSelectedCompanyId);
        setSuccessMessage("Cadastrado!");
        startState();
      } else if (userCompanyId) {
        await repo.addItinerary(itinerary, userCompanyId);
        setSuccessMessage("Cadastrado!");
        startState();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{ width: "400px", padding: "10px" }}>
      <CardHeader title="Cadastro de Plano de Viagem" subheader="" />
      <Box sx={{ mb: "10px" }}>
        <TextField
          id="ltufilter"
          label="Filtro de LTU"
          size="small"
          value={ltuFilter}
          onChange={onLtuFilterChange}
        />
      </Box>

      <LTUFF
        onChange={onChange}
        value={state["LTU Correspondente"]}
        ltuFilter={ltuFilter}
      />
      {/* @ts-ignore */}
      {[...itineraryFields].map((field: IFormField) => {
        return (
          <Box sx={{ mb: "10px" }} key={field.id}>
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
