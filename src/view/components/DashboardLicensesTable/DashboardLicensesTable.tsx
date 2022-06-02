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
import { CustomTableWithoutOptions } from "../Table/CustomTableWithoutOptions";

type Props = { vehicles?: Vehicle[] };

const transpMap: any = {};

const getTranspName = async (transpId: string) => {
  if (transpMap[transpId]) return transpMap[transpId];

  const transpName = await fetchCompanyName(transpId);
  transpMap[transpId] = transpName;
  return transpName;
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

  useEffect(() => {
    fetchVehicles(setVehicles, true);
  }, [adminSelectedCompanyId, userCompanyId]);

  useEffect(() => {
    const filtered = vehicles.filter((v) => {
      const checkDate = v.values["Último Licenciamento"];
      checkDate.setFullYear(checkDate.getFullYear() + 1);

      const response = checkIsCNHDueDate(checkDate);
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
    <CustomTableWithoutOptions tableHead={tableHead} tableRows={tableRows} />
  );
};
