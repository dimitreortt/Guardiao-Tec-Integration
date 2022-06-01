import { Box } from "@mui/material";
import moment from "moment";
import React, { FunctionComponent } from "react";
import { Driver } from "../../../domain/entities/Driver";
import { CustomTable } from "../../components/Table/CustomTable";
import { RowCommand } from "../../components/Table/TableRowOptions";

type Props = {
  onRowCommand: (command: RowCommand, row: string[]) => void;
  noRowOptions?: boolean;
  drivers: Driver[];
  ommitFields?: string[];
};

export const CustomDriversTable: FunctionComponent<Props> = ({
  onRowCommand,
  drivers,
  noRowOptions,
  ommitFields,
}) => {
  const driversTableHead = [
    "Nome",
    "Contato",
    "CNH",
    "Vencimento CNH",
    // "", // necessário para a simetria da tabela
  ];
  if (!noRowOptions) driversTableHead.push("");
  if (ommitFields?.includes("contato")) driversTableHead.splice(1, 1);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const driver of drivers) {
      const row = [
        driver.values.nome,
        driver.values.contato,
        driver.values.cnh,
        moment(driver.values.vencimento).format("MM/YYYY"),
      ];
      if (ommitFields?.includes("contato")) row.splice(1, 1);
      rows.push(row);
    }
    return rows;
  };

  const driversTableRows = makeTableRows();

  return (
    <Box sx={{ height: "100%" }}>
      <CustomTable
        tableHead={driversTableHead}
        tableRows={driversTableRows}
        // onRowCommand={onRowCommand ? onRowCommand : ("" as any)}
        onRowCommand={onRowCommand}
        noRowOptions={noRowOptions}
      />
    </Box>
  );
};
