import React, { FunctionComponent, useState } from "react";
import { PlanningReportValues } from "../../../domain/entities/Report";
import { Button, Dialog, DialogTitle, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { ReportPDFListItem } from "./ReportPDFListItem";

type Props = { reports: PlanningReportValues[]; companyName: string };

export const ExportButton: FunctionComponent<Props> = ({
  reports,
  companyName,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleExport = () => {
    setOpen((prev) => !prev);
    console.log(reports);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 1, backgroundColor: "primary" }}
        onClick={handleExport}
      >
        exportar
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ sx: { width: "400px" } }}
      >
        {/* <DialogTitle>Nome da transportadora</DialogTitle> */}
        <Box sx={{ p: 2 }}>
          Confira abaixo os códigos de TMS gerados pelos Correios:
          <Divider sx={{ my: 2 }} />
          {reports.map((r, index) => (
            <ReportPDFListItem key={index} report={r} />
          ))}
        </Box>
      </Dialog>
    </div>
  );
};
