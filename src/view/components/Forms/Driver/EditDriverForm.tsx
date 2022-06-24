import React, { FunctionComponent, useEffect, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { Box, Dialog } from "@mui/material";
import { BaseDriverForm } from "./BaseDriverForm";
import { Driver } from "../../../../domain/entities/Driver";
import { DriverRepositoryDatabase } from "../../../../infra/repository/DriverRepositoryDatabase";
import { RootState } from "../../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { driverFormFields } from "./driverFormFields";
import { FileUploader } from "../../Common/FileUploader";
import { uploadFileToStorage } from "../../../../infra/services/uploadFileToStorage";

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
  const [previousFilename, setPreviousFilename] = useState<any>("");
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const [file, setFile] = useState<File>();
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  //   const startState = () =>
  //     setState(initialState ? initialState : makeInitialFormState(driverFields));
  const resetState = (setState: any) => {
    setState(makeInitialFormState(driverFormFields()));
    setFileUploaded(false);
    setFile(undefined);
    setPreviousFilename("");
  };

  useEffect(() => {
    setPreviousFilename(driver.values.cnhDocument?.name);
  }, []);

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

  const getCNHFileData = async (cid: string) => {
    if (!fileUploaded) return driver.values.cnhDocument;
    if (file) {
      const { storagePath } = await uploadFileToStorage(cid, file);
      const cnhDocument = {
        name: file.name,
        type: file.type,
        storagePath,
      };
      return cnhDocument;
    }
    throw new Error("No previous file nor new file in editDriver");
  };

  const onSave = async (state: any, setState: any) => {
    let cid = userCompanyId ? userCompanyId : adminSelectedCompanyId;
    if (!cid) return setError("Nenhuma transportadora selecionada");

    try {
      const cnhDocument = await getCNHFileData(cid);
      console.log(cnhDocument);
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);

      const driverValues = {
        nome: state.Nome,
        cnh: state.CNH,
        contato: state.Contato,
        vencimento: state.Vencimento,
        cnhDocument,
      };

      console.log(driverValues);

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

  const onUpload = () => setFileUploaded(true);

  const appendice = (
    <Box
      sx={{
        mb: "10px",
        border: "1px solid",
        borderRadius: "5px",
        borderColor: "#bbb",
      }}
    >
      <FileUploader
        setFile={setFile}
        name={file?.name || previousFilename}
        onUpload={onUpload}
      />
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={"EditDriverForm"}>
      <BaseDriverForm
        onSave={onSave}
        initialState={initialState}
        appendice={appendice}
      />
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
