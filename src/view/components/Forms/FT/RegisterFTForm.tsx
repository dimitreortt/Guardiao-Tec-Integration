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
import { FTRepositoryDatabase } from "../../../../infra/repository/FTRepositoryDatabase";
import { FT } from "../../../../domain/entities/FT";
import { useSelector } from "react-redux";
import { RootState } from "../../../../application/store/configureStore";
import { ftFormFields } from "./ftFormFields";
import { makeInitialFormState } from "../Utils/makeInitialFormState";
import { FileUploader } from "../../Common/FileUploader";
import { uploadFileToStorage } from "../../../../infra/services/uploadFileToStorage";

type Props = {};

export const RegisterFTForm: FunctionComponent<Props> = ({}) => {
  const [state, setState] = useState<any>({});
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const [file, setFile] = useState<File>();
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const ftFields = ftFormFields();

  const startState = () => {
    setState(makeInitialFormState(ftFields));
    setFile(undefined);
  };

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

  const onSave = async () => {
    let cid = userCompanyId ? userCompanyId : adminSelectedCompanyId;
    if (!cid) return setError("Nenhuma transportadora selecionada");

    try {
      let ftDocumentFileData: any = {};
      if (file) {
        const { storagePath } = await uploadFileToStorage(cid, file);
        ftDocumentFileData = {
          name: file.name,
          type: file.type,
          storagePath,
        };
      }
      const ft = new FT({ ...state, ftDocumentFileData });
      const repo = new FTRepositoryDatabase();
      //await repo.addFT(ft);

      //   startState();
      if (isAdmin && adminSelectedCompanyId) {
        await repo.addFT(ft, adminSelectedCompanyId);
        setSuccessMessage("Ficha Técnica cadastrada!");
        startState();
      } else if (userCompanyId) {
        await repo.addFT(ft, userCompanyId);
        setSuccessMessage("Ficha Técnica cadastrada!");
        startState();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card sx={{ width: "400px", padding: "10px" }}>
      <CardHeader title="Cadastro de Ficha Técnica" subheader="" />
      {ftFields.map((field: IFormField, index) => {
        return (
          <Box sx={{ mb: "10px" }} key={index}>
            <RenderFormField
              field={field}
              onChange={onChange}
              value={state[field.label]}
            />
          </Box>
        );
      })}
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
