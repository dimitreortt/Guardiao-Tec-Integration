import moment from "moment";
import React, { FunctionComponent } from "react";
import { ReportValues } from "../../../domain/entities/Report";
import { fetchCompanyName } from "../../../infra/services/fetchCompanyName";
import { CustomTableWithoutOptions } from "../../components/Table/CustomTableWithoutOptions";
moment.locale("pt-br");
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
    let errorsReports = reports.filter((f) => f.status === "error");
    errorsReports = errorsReports.sort(
      //@ts-ignore
      (r1, r2) => new Date(r2.createdAt) - new Date(r1.createdAt)
    );
    for (const report of errorsReports) {
      //   const transpName = await getTranspName(vehicle.transpId);
      const row = [
        moment(report.createdAt).format("DD/MM/yyyy hh:mm:ss"),
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
