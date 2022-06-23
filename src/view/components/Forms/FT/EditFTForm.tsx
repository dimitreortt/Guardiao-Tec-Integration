import React, { FunctionComponent, useEffect, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { Dialog } from "@mui/material";
import { Driver } from "../../../../domain/entities/Driver";
import { RootState } from "../../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { ftFormFields } from "./ftFormFields";
import { FT } from "../../../../domain/entities/FT";
import { BaseFTForm } from "./BaseFTForm";
import { selectCurrentRelatedCompanyId } from "../../../../infra/services/selectCurrentRelatedCompanyId";
import { FTRepositoryDatabase } from "../../../../infra/repository/FTRepositoryDatabase";

type Props = {
  open: boolean;
  onClose: () => void;
  ft: FT;
  ftId: string;
};

export const EditFTForm: FunctionComponent<Props> = ({
  open,
  onClose,
  ft,
  ftId,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [initialState, setInitialState] = useState<any>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const resetState = (setState: any) =>
    setState(makeInitialFormState(ftFormFields()));

  useEffect(() => {
    let initialState: any = {};
    for (const field in ft.values) {
      //@ts-ignore
      initialState[field] = ft.values[field];
    }
    setInitialState(initialState);
  }, [ft]);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    try {
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);
      const ft = new FT(state);
      const repo = new FTRepositoryDatabase();
      const companyId = selectCurrentRelatedCompanyId();
      if (!companyId)
        throw new Error(
          "Id de transportadora não identificado! Impossível salvar FT!"
        );
      await repo.updateFT(ft, companyId, ftId);
      setSuccessMessage("Ficha Técnica atualizada!");
      resetState(setState);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={"EditFTForm"}>
      <BaseFTForm onSave={onSave} initialState={initialState} />
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
