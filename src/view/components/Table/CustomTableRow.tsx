import { TableCell, TableRow } from "@mui/material";
import React, { FunctionComponent } from "react";
import { uid } from "react-uid";
import { RowCommand, TableRowOptions } from "./TableRowOptions";
import uuid from "react-uuid";

type Props = {
  row: string[];
  onRowCommand: (command: RowCommand, row: string[]) => void;
  noRowOptions?: boolean;
  hasEditManyOption?: boolean;
};

export const CustomTableRow: FunctionComponent<Props> = ({
  row,
  onRowCommand,
  noRowOptions,
  hasEditManyOption,
}) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {row.map((column, index) => {
        return (
          <TableCell align="center" key={uuid()} sx={{ paddingX: 0.4 }}>
            {column}
          </TableCell>
        );
      })}
      {!noRowOptions && (
        <TableCell align="center" sx={{ width: "10px" }}>
          <TableRowOptions
            onRowCommand={onRowCommand}
            row={row}
            hasEditManyOption={hasEditManyOption}
          />
        </TableCell>
      )}
    </TableRow>
  );
};
