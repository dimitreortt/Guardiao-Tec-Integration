import moment from "moment";
import React, { FunctionComponent } from "react";
import { ReportValues } from "../../../domain/entities/Report";
import { fetchCompanyName } from "../../../infra/services/fetchCompanyName";
import { CustomTableWithoutOptions } from "../../components/Table/CustomTableWithoutOptions";

type Props = {
  reports: ReportValues[];
};

const transpMap: any = {};

const getTranspName = async (transpId: string) => {
  if (transpMap[transpId]) return transpMap[transpId];

  const transpName = await fetchCompanyName(transpId);
  transpMap[transpId] = transpName;
  return transpName;
};

export const TMSErrorsReport: FunctionComponent<Props> = ({ reports }) => {
  const tableHead = [
    "Data",
    "Status",
    "Transportadora",
    "Mensagem",
    "Ficha Técnica",
  ];

  const makeTableRows = () => {
    const rows: string[][] = [];
    const errorsReports = reports.filter((f) => f.status === "error");
    for (const report of errorsReports) {
      //   const transpName = await getTranspName(vehicle.transpId);
      const row = [
        moment(report.createdAt).format("DD/MM/YYYY hh:mm"),
        report.status,
        report.transportadora,
        report.message,
        report.ft,
      ];
      rows.push(row);
    }
    return rows;
  };
  const tableRows = makeTableRows();

  return (
    <CustomTableWithoutOptions tableHead={tableHead} tableRows={tableRows} />
  );
};
