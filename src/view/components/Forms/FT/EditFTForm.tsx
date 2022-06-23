import React, { FunctionComponent, useEffect, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { Box, Dialog } from "@mui/material";
import { Driver } from "../../../../domain/entities/Driver";
import { RootState } from "../../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { ftFormFields } from "./ftFormFields";
import { FT } from "../../../../domain/entities/FT";
import { BaseFTForm } from "./BaseFTForm";
import { selectCurrentRelatedCompanyId } from "../../../../infra/services/selectCurrentRelatedCompanyId";
import { FTRepositoryDatabase } from "../../../../infra/repository/FTRepositoryDatabase";
import { FileUploader } from "../../Common/FileUploader";
import { uploadFileToStorage } from "../../../../infra/services/uploadFileToStorage";

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
  const [file, setFile] = useState<File>();
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<any>();
  const [previousFilename, setPreviousFilename] = useState<any>("");
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  const resetState = (setState: any) => {
    setState(makeInitialFormState(ftFormFields()));
    setFileUploaded(false);
    setFile(undefined);
    setPreviousFilename("");
  };

  useEffect(() => {
    setPreviousFilename(ft.values.ftDocumentFileData.name);
  }, []);

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

  console.log(initialState);

  const getFtFileData = async (cid: string) => {
    if (!fileUploaded) return ft.values.ftDocumentFileData;
    if (file) {
      const { storagePath } = await uploadFileToStorage(cid, file);
      const ftDocumentFileData = {
        name: file.name,
        type: file.type,
        storagePath,
      };
      return ftDocumentFileData;
    }
    throw new Error("No previous file nor new file");
  };

  const onSave = async (state: any, setState: any) => {
    let cid = userCompanyId ? userCompanyId : adminSelectedCompanyId;
    if (!cid) return setError("Nenhuma transportadora selecionada");

    try {
      let ftDocumentFileData = await getFtFileData(cid);
      for (const key in state)
        if (!state[key]) throw new Error(`Campo ${key} inválido!`);
      const ft = new FT({ ...state, ftDocumentFileData });
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
    <Dialog open={open} onClose={onClose} aria-labelledby={"EditFTForm"}>
      <BaseFTForm
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
