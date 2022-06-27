import React, { FunctionComponent, useEffect, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { Dialog } from "@mui/material";
import { Driver } from "../../../../domain/entities/Driver";
import { RootState } from "../../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { FT } from "../../../../domain/entities/FT";
import { selectCurrentRelatedCompanyId } from "../../../../infra/services/selectCurrentRelatedCompanyId";
import { FTRepositoryDatabase } from "../../../../infra/repository/FTRepositoryDatabase";
import { useItineraryFormFields } from "./useItineraryFormFields";
import { Itinerary } from "../../../../domain/entities/Itinerary";
import { ItineraryRepositoryDatabase } from "../../../../infra/repository/ItineraryRepositoryDatabase";
import { BaseItineraryForm } from "./BaseItineraryForm";

type Props = {
  open: boolean;
  onClose: () => void;
  itinerary: Itinerary;
  itineraryId: string;
};

export const EditItineraryForm: FunctionComponent<Props> = ({
  open,
  onClose,
  itinerary,
  itineraryId,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [initialState, setInitialState] = useState<any>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const itineraryFields = useItineraryFormFields();

  const resetState = (setState: any) =>
    setState(makeInitialFormState(itineraryFields));

  useEffect(() => {
    let initialState: any = {};
    for (const field in itinerary.values) {
      //@ts-ignore
      initialState[field] = itinerary.values[field];
    }
    setInitialState(initialState);
  }, [itinerary]);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    try {
      if (!state["LTU Correspondente"])
        throw new Error("Selecione uma LTU Correspondente");
      // for (const key in state)
      //   if (!state[key]) throw new Error(`Campo ${key} inválido!`);
      const itinerary = new Itinerary(state);
      const repo = new ItineraryRepositoryDatabase();
      const companyId = selectCurrentRelatedCompanyId();
      if (!companyId)
        throw new Error(
          "Id de transportadora não identificado! Impossível salvar atualização no Plano de Viagem!"
        );
      await repo.updateItinerary(
        itinerary,
        adminSelectedCompanyId,
        itineraryId
      );
      setSuccessMessage("Plano de Viagem atualizada!");
      resetState(setState);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={"EditItineraryForm"}>
      <BaseItineraryForm onSave={onSave} initialState={initialState} />
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity="success"
      >
        {successMessage}
      </AlertSnackbar>
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity="error">
        {error}
      </AlertSnackbar>
    </Dialog>
  );
};
