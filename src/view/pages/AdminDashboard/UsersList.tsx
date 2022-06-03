import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { RootState } from "../../../application/store/configureStore";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { UserRepositoryDatabase } from "../../../infra/repository/UserRepositoryDatabase";
import { dispatchUserBlockedStatus } from "../../../application/service/dispatchUserBlockedStatus";

type Props = {};

export const UsersList: FunctionComponent<Props> = ({}) => {
  const users = useSelector((state: RootState) => state.users.users);

  const tableHead = ["E-mail", "Tipo de acesso", "Bloqueado", ""];
  let tableRows: (string | boolean)[][] = [];

  if (users) {
    tableRows = users.map((u) => {
      return [u.email, u.accessType, u.blocked];
    });
  }

  const handleLock = (row: (string | boolean)[]) => {
    const email = row[0];
    const user = users?.find((u) => u.email === email);
    if (!user) return;

    const repo = new UserRepositoryDatabase();
    const isBlocked = row[2];
    if (isBlocked) repo.unblockUser(user);
    else repo.blockUser(user);
    console.log(isBlocked);
    dispatchUserBlockedStatus(user, !isBlocked as boolean);
  };

  return (
    <TableContainer component={Box} sx={{}}>
      <Table sx={{ height: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead.map((column, index) => (
              <TableCell align="center" key={uuid()} sx={{ padding: 0 }}>
                <b>{column}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" key={uuid()}>
                {row[0]}
              </TableCell>
              <TableCell align="center" key={uuid()}>
                {row[1]}
              </TableCell>
              <TableCell align="center" key={uuid()}>
                {row[2] ? "Sim" : "Não"}
              </TableCell>
              <TableCell align="center" key={uuid()}>
                <Tooltip title="Bloquear">
                  <IconButton
                    onClick={() => handleLock(row)}
                    sx={{ p: 0, mx: 0, my: 0, display: "block" }}
                  >
                    {row[2] ? <LockOpenIcon /> : <BlockIcon />}
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
