import moment from "moment";
import React, { FunctionComponent } from "react";
import { Driver } from "../../../domain/entities/Driver";
import { CustomTable } from "../../components/Table/CustomTable";
import { RowCommand } from "../../components/Table/TableRowOptions";

type Props = {
  onRowCommand: (command: RowCommand, row: string[]) => void;
  drivers: Driver[];
};

export const CustomDriversTable: FunctionComponent<Props> = ({
  onRowCommand,
  drivers,
}) => {
  const driversTableHead = [
    "Nome",
    "Contato",
    "CNH",
    "Vencimento CNH",
    "", // necessário para a simetria da tabela
  ];

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const driver of drivers) {
      rows.push([
        driver.values.nome,
        driver.values.contato,
        driver.values.cnh,
        moment(driver.values.vencimento).format("MM/YYYY"),
      ]);
    }
    return rows;
  };

  const driversTableRows = makeTableRows();

  return (
    <CustomTable
      tableHead={driversTableHead}
      tableRows={driversTableRows}
      onRowCommand={onRowCommand}
    />
  );
};
