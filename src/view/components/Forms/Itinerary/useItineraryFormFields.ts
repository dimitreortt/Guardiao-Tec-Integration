import { selectCurrentRelatedCompanyId } from "./../../../../infra/services/selectCurrentRelatedCompanyId";
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

export const useItineraryFormFields = () => {
  const [fts, setFTs] = useState<FT[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const { adminSelectedCompanyId, userCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    const companyId = selectCurrentRelatedCompanyId();
    if (!companyId) return;
    setSelectedCompanyId(companyId);
  }, [adminSelectedCompanyId, userCompanyId]);

  useEffect(() => {
    if (!selectedCompanyId) return;
    const fetch = async () => {
      const ftsRepo = new FTRepositoryDatabase();
      const fts = await ftsRepo.getFTsFromCompanyId(selectedCompanyId);
      setFTs(fts);
    };
    // fetch();
  }, [selectedCompanyId]);

  const itineraryFields: IFormField[] = [
    // {
    //   label: 'LTU Correspondente',
    //   type: 'List Selection',
    //   options: fts.map((ft) => ft.values['Nº da Linha']),
    //   id: 10,
    //   index: 10,
    // },
    { label: "Sequencia", type: "Short Text", id: 0, index: 0 },
    { label: "CTO", type: "Short Text", id: 12, index: 0 },
    { label: "Ponto De Parada", type: "Short Text", id: 11, index: 1 },
    { label: "KM", type: "Short Text", id: 1, index: 1 },
    { label: "Chegada", type: "Time", id: 2, index: 2 },
    { label: "Partida", type: "Time", id: 3, index: 3 },
    { label: "Serviço", type: "Time", id: 4, index: 4 },
    { label: "Espera", type: "Time", id: 5, index: 5 },
    { label: "Livre", type: "Time", id: 6, index: 6 },
    { label: "Horas", type: "Time", id: 7, index: 7 },
    { label: "Serviços", type: "Short Text", id: 8, index: 8 },
    { label: "Endereço", type: "Short Text", id: 9, index: 9 },
  ];

  return itineraryFields;
};
