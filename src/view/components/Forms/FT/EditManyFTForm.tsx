import React, { FunctionComponent, useEffect, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { FT } from "../../../../domain/entities/FT";
import { EditManySelect } from "./EditManySelect";
import { RenderEditManyInput } from "./RenderEditManyInput";
import { FTRepositoryDatabase } from "../../../../infra/repository/FTRepositoryDatabase";
import { selectCurrentRelatedCompanyId } from "../../../../infra/services/selectCurrentRelatedCompanyId";

type Props = {
  open: boolean;
  onClose: () => void;
  ft: FT;
  ftId: string;
};

export const EditManyFTForm: FunctionComponent<Props> = ({
  open,
  onClose,
  ft,
  ftId,
}) => {
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [targetField, setTargetField] = useState("");
  const [newValue, setNewValue] = useState<any>("");

  const makeEditableFields = (ft: FT) => {
    const fields: string[] = [];
    for (const key in ft.values) {
      if (key === "Id") continue;
      if (key === "ftDocumentFileData") continue;
      if (key === "Nº da FT") continue;
      if (key === "Nº da Linha") continue;
      if (key === "Código") continue;
      if (key === "Numero de Contrato") continue;
      fields.push(key);
    }
    return fields;
  };

  const editableFields = makeEditableFields(ft);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onFieldChange = (chosen: string) => {
    setTargetField(chosen);
    setNewValue("");
  };

  const onInputChange = (newValue: any) => {
    setNewValue(newValue);
  };

  const handleUpdateMany = async () => {
    const repo = new FTRepositoryDatabase();
    const companyId = selectCurrentRelatedCompanyId();
    if (!companyId) {
      setError("Nenhuma transportadora selecionada!");
      return;
    }
    const count = await repo.updateManyFTs(companyId!, targetField, newValue);
    setSuccessMessage(count + " cadastros atualizados!");
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  console.log(newValue);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={"EditFTForm"}>
      <DialogTitle>Editar cadastro em massa</DialogTitle>
      <DialogContent>
        Esta operação atualiza os dados de todas as fichas técnicas em relação
        ao campo selecionado. Esta operação não pode ser desfeita
        <Box sx={{ mt: 2 }}></Box>
        <EditManySelect
          label={targetField || "Nome do Campo"}
          options={editableFields}
          value=""
          onChange={onFieldChange}
        />
        <Box sx={{ mt: 2 }}></Box>
        <RenderEditManyInput
          targetField={targetField}
          ft={ft}
          onInputChange={onInputChange}
          currentValue={newValue}
        />
        <DialogActions>
          <Button
            onClick={handleUpdateMany}
            disabled={!targetField}
            fullWidth
            variant="contained"
            color="primary"
          >
            salvar
          </Button>
        </DialogActions>
      </DialogContent>
      {/* <BaseFTForm
        onSave={onSave}
        initialState={initialState}
        appendice={appendice}
      /> */}
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
