import React, { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import { Link } from "react-router-dom";
import { CustomTable } from "../../components/Table/CustomTable";
import { Vehicle } from "../../../domain/entities/Vehicle";
import { useEffect } from "react";
import { useState } from "react";
import { VehicleRepositoryDatabase } from "../../../infra/repository/VehicleRepositoryDatabase";
import { RootState } from "../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { CompanyFilter } from "../../components/Filter/CompanyFilter";
import { canRegister } from "../../../application/service/canRegister";
import { TargetFilter } from "../Common/TargetFilter";
import { RowCommand } from "../../components/Table/TableRowOptions";
import { EditVehicleForm } from "../../components/Forms/Vehicle/EditVehicleForm";
import { fetchVehicles } from "../../../infra/services/fetchVehicles";
import { selectCurrentRelatedCompanyId } from "../../../infra/services/selectCurrentRelatedCompanyId";
import { DeleteConfirmDialog } from "../Common/DeleteConfirmDialog";
import moment from "moment";
import { RegisterButton } from "../Common/RegisterButton";
import { BaseStyledPage } from "../Common/BaseStyledPage";

type Props = {};

export const VehiclePage: FunctionComponent<Props> = ({}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandVehicle, setTargetCommandVehicle] = useState<Vehicle>();
  const { userId, isAdmin, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    fetchVehicles(setVehicles);
  }, [adminSelectedCompanyId, userCompanyId]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const vehicle of filteredVehicles) {
      rows.push([
        vehicle.values.Marca,
        vehicle.values.Modelo,
        vehicle.values.Cor,
        vehicle.values["Ano Fabricação"].getFullYear().toString(),
        vehicle.values["Ano Modelo"].getFullYear().toString(),
        vehicle.values.Placa,
        vehicle.values.Chassi,
        vehicle.values.Renavam,
        moment(vehicle.values["Último Licenciamento"]).format("MM/YYYY"),
        vehicle.values["Capacidade(Kg)"].toString(),
        vehicle.values.Categoria,
      ]);
    }
    return rows;
  };

  const vehiclesTableHead = [
    "Marca",
    "Modelo",
    "Cor",
    "Ano Fabricação",
    "Ano Modelo",
    "Placa",
    "Chassi",
    "Renavam",
    "Último Licenciamento",
    "Capacidade(Kg)",
    "Categoria",
    "",
  ];
  const vehiclesTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    const vehicle = vehicles.find((v) => v.values.Placa === row[5]);
    if (!vehicle) return;
    setTargetCommandVehicle(vehicle);
    if (command === "edit") setInEdit(true);
    if (command === "delete") setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchVehicles(setVehicles);
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchVehicles(setVehicles);
  };

  const onDelete = async (vehicleId: string) => {
    const repo = new VehicleRepositoryDatabase();
    let companyId = await selectCurrentRelatedCompanyId();
    if (!companyId)
      throw new Error(
        "Id de transportadora não identificado! Impossível deletar veículo!"
      );
    await repo.deleteVehicle(companyId, vehicleId);
  };

  return (
    <BaseStyledPage>
      {isAdmin && <CompanyFilter />}
      <TargetFilter
        targets={vehicles}
        setFilteredTargets={setFilteredVehicles}
        filterField="Placa"
        filterName="Placa"
      />
      <RegisterButton to={`/vehicle/register`} />
      <CustomTable
        tableHead={vehiclesTableHead}
        tableRows={vehiclesTableRows}
        onRowCommand={onRowCommand}
      />
      {inEdit && (
        <EditVehicleForm
          open={inEdit}
          onClose={onEditClose}
          vehicle={targetCommandVehicle!}
          vehicleId={targetCommandVehicle!.values.Id!}
        />
      )}
      {inDelete && (
        <DeleteConfirmDialog
          open={inDelete}
          onClose={onDeleteClose}
          targetId={targetCommandVehicle!.values.Id!}
          targetName={"Veículo"}
          onDelete={onDelete}
        />
      )}
    </BaseStyledPage>
  );
};
