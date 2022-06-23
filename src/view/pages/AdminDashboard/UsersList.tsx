import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { RootState } from "../../../application/store/configureStore";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { UserRepositoryDatabase } from "../../../infra/repository/UserRepositoryDatabase";
import { dispatchUserBlockedStatus } from "../../../application/service/dispatchUserBlockedStatus";
import { deleteUser } from "../../../application/service/deleteUser";
import { AlertSnackbar } from "../../components/Common/AlertSnackbar";

type Props = {};

export const UsersList: FunctionComponent<Props> = ({}) => {
  const users = useSelector((state: RootState) => state.users.users);
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const tableHead = ["E-mail", "Tipo de acesso", "Bloqueado", "", ""];
  let tableRows: (string | boolean)[][] = [];

  if (users) {
    tableRows = users.map((u) => {
      return [u.email, u.accessType, u.blocked, "oi"];
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
    dispatchUserBlockedStatus(user, !isBlocked as boolean);
  };

  const handleDelete = async (row: (string | boolean)[]) => {
    const foundUser = users?.find((u) => u.email === row[0]);
    try {
      if (!foundUser) return;
      await deleteUser(foundUser);
      setSuccessMessage("Usuário Deletado");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  return (
    <React.Fragment>
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
                  <Tooltip title={row[2] ? "Desbloquear" : "Bloquear"}>
                    <IconButton
                      onClick={() => handleLock(row)}
                      sx={{ p: 0, mx: 0, my: 0, display: "block" }}
                    >
                      {row[2] ? <LockOpenIcon /> : <BlockIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" key={uuid()}>
                  <Tooltip title={"Deletar"}>
                    <IconButton
                      onClick={() => handleDelete(row)}
                      sx={{ p: 0, mx: 0, my: 0, display: "block" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity="warning">
        {error}
      </AlertSnackbar>
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity="success"
      >
        {successMessage}
      </AlertSnackbar>
    </React.Fragment>
  );
};
