import React, { FunctionComponent, useEffect, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { Dialog } from "@mui/material";
import { BaseDriverForm } from "./BaseDriverForm";
import { Driver } from "../../../../domain/entities/Driver";
import { DriverRepositoryDatabase } from "../../../../infra/repository/DriverRepositoryDatabase";
import { RootState } from "../../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { driverFormFields } from "./driverFormFields";

type Props = {
  open: boolean;
  onClose: () => void;
  driver: Driver;
  driverId: string;
};

export const EditDriverForm: FunctionComponent<Props> = ({
  open,
  onClose,
  driver,
  driverId,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [initialState, setInitialState] = useState<any>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  //   const startState = () =>
  //     setState(initialState ? initialState : makeInitialFormState(driverFields));
  const resetState = (setState: any) =>
    setState(makeInitialFormState(driverFormFields()));

  useEffect(() => {
    const func = () => {
      let initialState: any = {};
      // for (const field in driver.values) {
      //   //@ts-ignore
      //   initialState[field] = driver.values[field];
      // }
      if (!driver) return;
      initialState.Nome = driver.values.nome;
      initialState.CNH = driver.values.cnh;
      initialState.Contato = driver.values.contato;
      initialState.Vencimento = driver.values.vencimento;

      setInitialState(initialState);
    };
    func();
  }, [driver]);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    try {
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);

      const driverValues = {
        nome: state.Nome,
        cnh: state.CNH,
        contato: state.Contato,
        vencimento: state.Vencimento,
      };

      const driver = new Driver(driverValues);
      const repo = new DriverRepositoryDatabase();

      if (isAdmin && adminSelectedCompanyId) {
        await repo.updateDriver(driver, adminSelectedCompanyId, driverId);
        setSuccessMessage("Motorista atualizado!");
        resetState(setState);
        // onClose();
      } else if (userCompanyId) {
        await repo.updateDriver(driver, userCompanyId, driverId);
        setSuccessMessage("Motorista atualizado!");
        resetState(setState);
        // onClose();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={"EditDriverForm"}>
      <BaseDriverForm onSave={onSave} initialState={initialState} />
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
