import React, { FunctionComponent, useEffect, useState } from "react";
import { IFormField } from "../../../../domain/entities/FormField";
import { Vinculo } from "../../../../domain/entities/Vinculo";
import { Company } from "../../../../domain/entities/Company";
import { VehicleRepositoryDatabase } from "../../../../infra/repository/VehicleRepositoryDatabase";
import { Vehicle } from "../../../../domain/entities/Vehicle";
import { Itinerary } from "../../../../domain/entities/Itinerary";
import { ItineraryRepositoryDatabase } from "../../../../infra/repository/ItineraryRepositoryDatabase";
import { DriverRepositoryDatabase } from "../../../../infra/repository/DriverRepositoryDatabase";
import { Driver } from "../../../../domain/entities/Driver";
import { FTRepositoryDatabase } from "../../../../infra/repository/FTRepositoryDatabase";
import { FT } from "../../../../domain/entities/FT";
import { useSelector } from "react-redux";
import { RootState } from "../../../../application/store/configureStore";

export const useVinculoFormFields = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fts, setFTs] = useState<FT[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { selectedLTU, adminSelectedCompanyId, userCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

  useEffect(() => {
    if (isAdmin && adminSelectedCompanyId) {
      setSelectedCompanyId(adminSelectedCompanyId);
    } else if (!isAdmin && userCompanyId) {
      setSelectedCompanyId(userCompanyId);
    }
  }, [adminSelectedCompanyId, userCompanyId]);

  useEffect(() => {
    if (!selectedCompanyId) return;
    const fetch = async () => {
      const driversRepo = new DriverRepositoryDatabase();
      const drivers = await driversRepo.getDriversFromCompanyId(
        selectedCompanyId
      );
      setDrivers(drivers);

      const vehiclesRepo = new VehicleRepositoryDatabase();
      const vehicles = await vehiclesRepo.getVehiclesFromCompanyId(
        selectedCompanyId
      );
      setVehicles(vehicles);

      const ftsRepo = new FTRepositoryDatabase();
      const fts = await ftsRepo.getFTsFromCompanyId(selectedCompanyId);
      setFTs(fts);

      const itinerariesRepo = new ItineraryRepositoryDatabase();
      const itineraries = await itinerariesRepo.getItinerariesFromCompanyId(
        selectedCompanyId
      );
      setItineraries(itineraries);
    };

    fetch();
  }, [selectedCompanyId]);

  const vinculoFields: IFormField[] = [
    {
      label: "Ficha Técnica",
      type: "List Selection",
      options: fts.map((ft) => ft.values["Nº da FT"]),
      id: 4,
      helpertText: "Inserir o número Ficha Técnica",
    },
    {
      label: "Veículo",
      type: "List Selection",
      options: vehicles.map((v) => v.values.Placa),
      id: 2,
      index: 2,
      helpertText: "Inserir a placa do veículo",
    },
    {
      label: "Motorista",
      type: "List Selection",
      options: drivers.map((d) => d.values.nome),
      id: 1,
      index: 1,
      helpertText: "Inserir o nome do motorista",
    },
    {
      label: "Motorista 2",
      type: "List Selection",
      options: [...drivers.map((d) => d.values.nome), "Nenhum"],
      id: 5,
      index: 5,
      helpertText: "Inserir o nome do segundo motorista, se houver",
    },
    {
      label: "Plano de Viagem",
      type: "List Selection",
      options: fts.map((ft) => ft.values["Nº da Linha"]),
      id: 3,
      helpertText: "Inserir a LTU do Plano de Viagem",
    },
  ];

  return vinculoFields;
};
