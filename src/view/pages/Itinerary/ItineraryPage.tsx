import React, { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import { Link } from "react-router-dom";
import { CustomTable } from "../../components/Table/CustomTable";
import { Itinerary, ItineraryValue } from "../../../domain/entities/Itinerary";
import { useEffect } from "react";
import { useState } from "react";
import { ItineraryRepositoryDatabase } from "../../../infra/repository/ItineraryRepositoryDatabase";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";
import { CompanyFilter } from "../../components/Filter/CompanyFilter";
import { canRegister } from "../../../application/service/canRegister";
import { LTUFilter } from "../../components/Filter/LTUFilter";
import { RowCommand } from "../../components/Table/TableRowOptions";
import { EditItineraryForm } from "../../components/Forms/Itinerary/EditItineraryForm";
import { selectCurrentRelatedCompanyId } from "../../../infra/services/selectCurrentRelatedCompanyId";
import { DeleteConfirmDialog } from "../Common/DeleteConfirmDialog";
import { RegisterButton } from "../Common/RegisterButton";
import { BaseStyledPage } from "../Common/BaseStyledPage";

type Props = {};

export const ItineraryPage: FunctionComponent<Props> = ({}) => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const [targetCommandItinerary, setTargetCommandItinerary] =
    useState<Itinerary>();
  const { userCompanyId, adminSelectedCompanyId, selectedLTU } = useSelector(
    (state: RootState) => state.companies
  );

  const fetchItinerariesFromLTU = async (LTU: string) => {
    const repo = new ItineraryRepositoryDatabase();
    const itineraries = await repo.getItinerariesFromLTU(LTU);
    setItineraries(itineraries);
  };

  useEffect(() => {
    fetchItinerariesFromLTU(selectedLTU);
  }, [selectedLTU]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    itineraries.sort(
      (i1: any, i2: any) => i1.values.Sequencia - i2.values.Sequencia
    );

    for (const itinerary of itineraries) {
      const values = itinerary.values;
      const dateTimeFields: ItineraryValue[] = [
        "Chegada",
        "Partida",
        "Serviço",
        "Espera",
        "Livre",
        "Horas",
      ];

      const formatedFields = dateTimeFields.map((field: ItineraryValue) =>
        values[field] ? moment(values[field]).format("HH:mm") : ""
      );

      rows.push([
        // itinerary.values["LTU Correspondente"],
        itinerary.values.Sequencia,
        itinerary.values.CTO,
        itinerary.values["Ponto De Parada"],
        itinerary.values.Km,
        // moment(itinerary.values.Chegada).format("HH:mm"),
        // moment(itinerary.values.Partida).format("HH:mm"),
        // moment(itinerary.values.Serviço).format("HH:mm"),
        // moment(itinerary.values.Espera).format("HH:mm"),
        // moment(itinerary.values.Livre).format("HH:mm"),
        // moment(itinerary.values.Horas).format("HH:mm"),
        ...formatedFields,
        itinerary.values.Serviços,
        itinerary.values.Endereço,
      ]);
    }
    return rows;
  };

  const itinerariesTableHead = [
    // "LTU Correspondente",
    "Sequencia",
    "CTO",
    "Ponto De Parada",
    "KM",
    "Chegada",
    "Partida",
    "Serviço",
    "Espera",
    "Livre",
    "Horas",
    "Serviços",
    "Endereço",
    "",
  ];
  const itinerariesTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    const itinerary = itineraries.find((i) => i.values.Sequencia === row[1]);
    if (!itinerary) return;
    setTargetCommandItinerary(itinerary);
    if (command === "edit") setInEdit(true);
    if (command === "delete") setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchItinerariesFromLTU(selectedLTU);
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchItinerariesFromLTU(selectedLTU);
  };

  const onDelete = async (ftId: string) => {
    const repo = new ItineraryRepositoryDatabase();
    let companyId = await selectCurrentRelatedCompanyId();
    if (!companyId)
      throw new Error(
        "Id de transportadora não identificado! Impossível deletar linha do Plano de Viagem!"
      );
    await repo.deleteItinerary(companyId, ftId);
  };

  return (
    <BaseStyledPage>
      {/* <ResponsiveAppBar /> */}
      {isAdmin && <CompanyFilter />}
      {/* {isAdmin && <LTUFilter />} */}
      <LTUFilter />
      <RegisterButton to={`/itinerary/register`} />
      {/* <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/itinerary/register`}
          variant='contained'
          color='primary'
          disabled={!canRegister()}
        >
          Cadastrar
        </Button>
      </Box> */}
      <CustomTable
        tableHead={itinerariesTableHead}
        tableRows={itinerariesTableRows}
        onRowCommand={onRowCommand}
      />
      {inEdit && (
        <EditItineraryForm
          open={inEdit}
          onClose={onEditClose}
          itinerary={targetCommandItinerary!}
          itineraryId={targetCommandItinerary!.values.Id!}
        />
      )}
      {inDelete && (
        <DeleteConfirmDialog
          open={inDelete}
          onClose={onDeleteClose}
          targetId={targetCommandItinerary!.values.Id!}
          targetName={"Linha do Plano de Viagem"}
          onDelete={onDelete}
        />
      )}
    </BaseStyledPage>
  );
};
