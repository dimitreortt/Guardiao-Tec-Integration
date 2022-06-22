import { Divider, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import moment from "moment";
import React, { FunctionComponent } from "react";
import { PlanningReportValues } from "../../../domain/entities/Report";

type Props = { report: PlanningReportValues };

const MyTypo = styled(Typography)({
  width: "160px",
});

const TMSLine = ({ name, value, color }: any) => (
  <Box sx={{ display: "flex", mb: 0.4 }}>
    <MyTypo>
      <b>{name}:</b>
    </MyTypo>
    <Typography sx={{ color: color ? color : "black" }}>{value}</Typography>
  </Box>
);

export const ReportPDFListItem: FunctionComponent<Props> = ({ report }) => {
  return (
    <Box sx={{}}>
      {/* <MyTypo>Linha</MyTypo> */}
      <TMSLine name="Linha" value={report.linha}></TMSLine>
      <TMSLine name="Placa" value={report.placa}></TMSLine>
      <TMSLine
        name="Horário Envio"
        // value={report.horarioEnvio.toLocaleString("pt-BR", {
        //   timeZone: "America/Sao_Paulo",
        //   hour: "2-digit",
        //   minute: "2-digit",
        // })}
        value={moment(report.horarioEnvio).format("DD/MM/YYYY hh:mm")}
      ></TMSLine>
      <TMSLine
        name="Abertura Linha"
        value={moment(report.aberturaLinha).format("DD/MM/YYYY hh:mm")}
      ></TMSLine>
      <TMSLine name="ID Ficha Técnica" value={report.ft}></TMSLine>
      <TMSLine name="Código TMS" value={report.codigoTMS} color="red"></TMSLine>
      <TMSLine
        name="Resultado"
        value={report.resultado}
        color={report.resultado === "Sucesso" ? "success.main" : "error.main"}
      ></TMSLine>
      <Divider sx={{ my: 1 }} />
    </Box>
  );
};
