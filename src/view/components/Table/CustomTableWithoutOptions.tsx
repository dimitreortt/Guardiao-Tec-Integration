import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import uuid from "react-uuid";
// import { RootState } from "../../../application/store/configureStore";
// import { Vehicle } from "../../../domain/entities/Vehicle";
// import { fetchCompanyName } from "../../../infra/services/fetchCompanyName";
// import { fetchVehicles } from "../../../infra/services/fetchVehicles";
// import { checkIsCNHDueDate } from "../../pages/AdminDashboard/checkIsCNHDueDate";

type Props = {
  tableHead: string[];
  tableRows: string[][];
};

const Row = ({ row }: { row: string[] }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {row.map((column, index) => {
        return (
          <TableCell align="center" key={uuid()}>
            {column}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export const CustomTableWithoutOptions: FunctionComponent<Props> = ({
  tableHead,
  tableRows,
}) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
      <Table
        sx={{ minWidth: 650, maxHeight: "100%" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {tableHead.map((column, index) => (
              <TableCell align="center" key={uuid()} sx={{ paddingX: 0 }}>
                <b>{column}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, index) => (
            <Row row={row} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
