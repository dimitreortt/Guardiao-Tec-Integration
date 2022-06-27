import React, { FunctionComponent, useEffect, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { Dialog } from "@mui/material";
import { Driver } from "../../../../domain/entities/Driver";
import { RootState } from "../../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { VehicleRepositoryDatabase } from "../../../../infra/repository/VehicleRepositoryDatabase";
import { Vinculo } from "../../../../domain/entities/Vinculo";
import { BaseVinculoForm } from "./BaseVinculoForm";
import { selectCurrentRelatedCompanyId } from "../../../../infra/services/selectCurrentRelatedCompanyId";
import { VinculoRepositoryDatabase } from "../../../../infra/repository/VinculoRepositoryDatabase";
import { useVinculoFormFields } from "./useVinculoFormFields";
import { getCompanyInfo } from "../../../../application/service/getUserCompanyInfo";

type Props = {
  open: boolean;
  onClose: () => void;
  vinculo: Vinculo;
  vinculoId: string;
};

export const EditVinculoForm: FunctionComponent<Props> = ({
  open,
  onClose,
  vinculo,
  vinculoId,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [initialState, setInitialState] = useState<any>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const vinculoFields = useVinculoFormFields();
  const [companyName, setCompanyName] = useState("");

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

  useEffect(() => {
    const func = async () => {
      const id = getCompanyId();
      const name = await getCompanyName(id!);
      setCompanyName(name);
    };
    func();
  }, [adminSelectedCompanyId, userCompanyId]);

  const resetState = (setState: any) =>
    setState(makeInitialFormState(vinculoFields));

  useEffect(() => {
    let initialState: any = {};
    for (const field in vinculo.values) {
      //@ts-ignore
      initialState[field] = vinculo.values[field];
    }
    setInitialState(initialState);
  }, [vinculo]);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    try {
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);

      // const newState = {
      //   ...state,
      //   "Motorista 2":
      //     state["Motorista 2"] === "Nenhum" ? "" : state["Motorista 2"],
      // };
      // const vinculo = new Vinculo({ Transportadora: companyName, ...newState });

      let newState = {
        Transportadora: companyName,
        ...state,
        "Motorista 2":
          state["Motorista 2"] === "Nenhum" ? "" : state["Motorista 2"],
      };
      const vinculo = new Vinculo(newState);
      const repo = new VinculoRepositoryDatabase();
      const companyId = selectCurrentRelatedCompanyId();
      if (!companyId)
        throw new Error(
          "Id de transportadora não identificado! Impossível salvar vínculo!"
        );
      await repo.updateVinculo(vinculo, adminSelectedCompanyId, vinculoId);
      setSuccessMessage("Veículo atualizado!");
      resetState(setState);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={"EditVehicleForm"}>
      <BaseVinculoForm onSave={onSave} initialState={initialState} />
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
