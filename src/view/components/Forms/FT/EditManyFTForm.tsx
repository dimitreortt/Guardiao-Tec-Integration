import React, { FunctionComponent, useEffect, useState } from "react";
import { AlertSnackbar } from "../../Common/AlertSnackbar";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FT } from "../../../../domain/entities/FT";
import { EditManySelect } from "./EditManySelect";

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

  console.log(ft);

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  const onFieldChange = (chosen: string) => {
    setTargetField(chosen);
  };

  const onInputChange = (newValue: any) => {};

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={"EditFTForm"}>
      <DialogTitle>Editar cadastro em massa</DialogTitle>
      <DialogContent>
        Esta operação atualiza o dados de todas as fichas técnicas em relação ao
        campo selecionado. Esta operação não pode ser desfeita
        <Box sx={{ mt: 2 }}></Box>
        <EditManySelect
          label={"Nome do Campo"}
          options={editableFields}
          value=""
          onChange={onFieldChange}
        />
        <RenderEditManyInput
          targetField={targetField}
          ft={ft}
          onInputChange={onInputChange}
        />
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
