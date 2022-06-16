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

export const TMSSuccessReport: FunctionComponent<Props> = ({ reports }) => {
  const tableHead = [
    "Data",
    "Status",
    "Transportadora",
    "Mensagem",
    "Ficha Técnica",
  ];

  const makeTableRows = () => {
    const rows: string[][] = [];
    let successReports = reports.filter((f) => f.status === "success");
    successReports = successReports.sort(
      //@ts-ignore
      (sr1, sr2) => new Date(sr2.createdAt) - new Date(sr1.createdAt)
    );
    for (const report of successReports) {
      //   const transpName = await getTranspName(vehicle.transpId);
      const row = [
        report.createdAt.toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
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
