import React, { FunctionComponent, useEffect, useState } from "react";
import { Driver } from "../../../../domain/entities/Driver";
import { DriverRepositoryDatabase } from "../../../../infra/repository/DriverRepositoryDatabase";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { RenderFormField } from "../../FormField/RenderFormField";
import { useSelector } from "react-redux";
import { RootState } from "../../../../application/store/configureStore";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { BaseDriverForm } from "./BaseDriverForm";
import { driverFormFields } from "./driverFormFields";
import { Box } from "@mui/material";
import { FileUploader } from "../../Common/FileUploader";
import { uploadFileToStorage } from "../../../../infra/services/uploadFileToStorage";

type Props = {};

export const RegisterDriverForm: FunctionComponent<Props> = ({}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const [file, setFile] = useState<File>();
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const resetState = (setState: any) => {
    setFile(undefined);
    setState(makeInitialFormState(driverFormFields()));
  };

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onSave = async (state: any, setState: any) => {
    let cid = userCompanyId ? userCompanyId : adminSelectedCompanyId;
    if (!cid) return setError("Nenhuma transportadora selecionada");

    try {
      let cnhDocument: any = {};
      if (file) {
        const { storagePath } = await uploadFileToStorage(cid, file);
        cnhDocument = {
          name: file.name,
          type: file.type,
          storagePath,
        };
      }

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

      const driver = new Driver(driverValues);
      const repo = new DriverRepositoryDatabase();

      if (isAdmin && adminSelectedCompanyId) {
        await repo.addDriver(driver, adminSelectedCompanyId);
        setSuccessMessage("Motorista cadastrado!");
        resetState(setState);
      } else if (userCompanyId) {
        await repo.addDriver(driver, userCompanyId);
        setSuccessMessage("Motorista cadastrado!");
        resetState(setState);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const appendice = (
    <Box
      sx={{
        mb: "10px",
        border: "1px solid",
        borderRadius: "5px",
        borderColor: "#bbb",
      }}
    >
      <FileUploader setFile={setFile} name={file?.name} />
    </Box>
  );

  return (
    <div>
      <BaseDriverForm onSave={onSave} appendice={appendice} />
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity="error">
        {error}
      </AlertSnackbar>
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity="success"
      >
        {successMessage}
      </AlertSnackbar>
    </div>
  );
};
