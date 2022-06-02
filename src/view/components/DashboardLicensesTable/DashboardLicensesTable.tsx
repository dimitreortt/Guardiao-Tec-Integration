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
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { RootState } from "../../../application/store/configureStore";
import { Vehicle } from "../../../domain/entities/Vehicle";
import { fetchCompanyName } from "../../../infra/services/fetchCompanyName";
import { fetchVehicles } from "../../../infra/services/fetchVehicles";
import { checkIsCNHDueDate } from "../../pages/AdminDashboard/checkIsCNHDueDate";

type Props = { vehicles?: Vehicle[] };

const transpMap: any = {};

const getTranspName = async (transpId: string) => {
  if (transpMap[transpId]) return transpMap[transpId];

  const transpName = await fetchCompanyName(transpId);
  transpMap[transpId] = transpName;
  return transpName;
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

export const DashboardLicensesTable: FunctionComponent<Props> = ({}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [tableRows, setTableRows] = useState<string[][]>([]);
  const { userId, isAdmin, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  console.log(tableRows);

  useEffect(() => {
    fetchVehicles(setVehicles, true);
  }, [adminSelectedCompanyId, userCompanyId]);

  useEffect(() => {
    const filtered = vehicles.filter((v) => {
      const checkDate = v.values["Último Licenciamento"];
      checkDate.setFullYear(checkDate.getFullYear() + 1);

      const response = checkIsCNHDueDate(checkDate);
      console.log(response);
      return response;
    });
    setFilteredVehicles(filtered);
  }, [vehicles]);

  useEffect(() => {
    const func = async () => {
      const tableRows = await makeTableRows();
      setTableRows(tableRows);
    };
    func();
  }, [filteredVehicles]);

  const tableHead = ["Placa", "Transportadora", "Vencimento"];

  const makeTableRows = async () => {
    const rows: string[][] = [];
    for (const vehicle of filteredVehicles) {
      const transpName = await getTranspName(vehicle.values.transpId);

      const row = [
        vehicle.values.Placa,
        transpName,
        moment(vehicle.values["Último Licenciamento"]).format("MM/YYYY"),
      ];
      rows.push(row);
    }
    return rows;
  };

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
