import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { ftDocumentFileData } from "../../../domain/entities/FT";
import { downloadFile } from "../../../infra/services/downloadFile";
import { getDownloadUrl } from "../../../infra/services/getDownloadUrl";

type Props = {
  ftDocumentFileData: ftDocumentFileData;
  buttonText: string;
};

export const DownloadFileDialog: FunctionComponent<Props> = ({
  ftDocumentFileData,
  buttonText,
}) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleClose = () => setOpen(false);

  const handleOpen = async () => {
    setOpen((prev) => !prev);
    if (!open) {
      const url = await getDownloadUrl(ftDocumentFileData.storagePath);
      console.log(url);
      setUrl(url);
    }
    console.log(ftDocumentFileData);
  };

  const handleClick = () => {
    downloadFile(url, ftDocumentFileData.type);
  };

  return (
    <div>
      <Button
        variant="text"
        color="primary"
        sx={{ mb: 1, backgroundColor: "primary" }}
        onClick={handleOpen}
      >
        {buttonText}
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { width: "400px" } }}
      >
        <DialogTitle>Baixar arquivo?</DialogTitle>
        <DialogContent>
          {url && (
            <a href={url} target="_blank" download>
              {ftDocumentFileData.name}
            </a>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
