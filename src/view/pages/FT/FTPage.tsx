import React, { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CustomTable } from "../../components/Table/CustomTable";
import { FT } from "../../../domain/entities/FT";
import { useEffect } from "react";
import { useState } from "react";
import { FTRepositoryDatabase } from "../../../infra/repository/FTRepositoryDatabase";
import moment from "moment";
import { fetchFTs } from "../../../infra/services/fetchFTs";
import { CompanyFilter } from "../../components/Filter/CompanyFilter";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";
import { TargetFilter } from "../Common/TargetFilter";
import { RowCommand } from "../../components/Table/TableRowOptions";
import { EditFTForm } from "../../components/Forms/FT/EditFTForm";
import { DeleteConfirmDialog } from "../Common/DeleteConfirmDialog";
import { selectCurrentRelatedCompanyId } from "../../../infra/services/selectCurrentRelatedCompanyId";
import { BaseStyledPage } from "../Common/BaseStyledPage";
import { RegisterButton } from "../Common/RegisterButton";
import { DownloadFileDialog } from "../Common/DownloadFileDialog";
import { EditManyFTForm } from "../../components/Forms/FT/EditManyFTForm";

type Props = {};

export const FTPage: FunctionComponent<Props> = ({}) => {
  const [fts, setFTs] = useState<FT[]>([]);
  const [filteredFTs, setFilteredFTS] = useState<FT[]>([]);
  const [inEdit, setInEdit] = useState(false);
  const [inEditMany, setInEditMany] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandFT, setTargetCommandFT] = useState<FT>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    fetchFTs(setFTs);
    // if (adminSelectedCompanyId || userCompanyId) {
    // }
  }, [adminSelectedCompanyId, userCompanyId]);

  const getFtFileComponent = (ft: FT) => {
    const doc = ft.values.ftDocumentFileData;
    if (!doc) return "-";
    if (!doc.storagePath) return "-";
    let split = doc.name.split(".");
    const buttonText = split[split.length - 1];
    return (
      <DownloadFileDialog
        ftDocumentFileData={ft.values.ftDocumentFileData}
        buttonText={buttonText}
      />
    );
  };

  const makeFrequenciaJoinString = (freq: string[]) => {
    if (freq.length === 0) return "";
    return freq.join(",");
  };

  const makeTableRows = () => {
    let rows: (string | JSX.Element)[][] = [];
    for (const ft of filteredFTs) {
      rows.push([
        // ft.values["Numero de Contrato"],
        // ft.values["Código"],
        ft.values["Origem/Destino"],
        ft.values["Nº da FT"],
        ft.values["Nº da Linha"],
        moment(ft.values["Data de Vigencia Inicial"]).format("DD/MM/YY"),
        makeFrequenciaJoinString(ft.values["Frequência"]),
        ft.values.Sentido,
        getFtFileComponent(ft),
      ]);
    }
    return rows;
  };

  const ftsTableHead = [
    // "Numero de Contrato",
    // "Código",
    "Origem/Destino",
    "Nº da FT",
    "Nº da Linha",
    "Data de Vigencia Inicial",
    "Frequência",
    "Sentido",
    "Arquivo",
    "",
  ];
  const ftsTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    console.log(command);
    const ft = fts.find((ft) => ft.values["Nº da FT"] === row[1]);
    if (!ft) return;
    setTargetCommandFT(ft);
    if (command === "edit") setInEdit(true);
    if (command === "editMany") setInEditMany(true);
    if (command === "delete") setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchFTs(setFTs);
  };

  const onEditManyClose = () => {
    setInEditMany(false);
    fetchFTs(setFTs);
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchFTs(setFTs);
  };

  const onDelete = async (ftId: string) => {
    const repo = new FTRepositoryDatabase();
    let companyId = await selectCurrentRelatedCompanyId();
    if (!companyId)
      throw new Error(
        "Id de transportadora não identificado! Impossível deletar Ficha Técnica!"
      );
    await repo.deleteFT(companyId, ftId);
  };

  console.log(inEditMany);

  return (
    <BaseStyledPage>
      {isAdmin && <CompanyFilter />}
      <TargetFilter
        targets={fts}
        setFilteredTargets={setFilteredFTS}
        filterField="Nº da FT"
        filterName="Nº da FT"
      />
      <RegisterButton to={`/workscale/register`} />
      <CustomTable
        tableHead={ftsTableHead}
        //@ts-ignore
        tableRows={ftsTableRows}
        onRowCommand={onRowCommand}
      />

      {inEdit && (
        <EditFTForm
          open={inEdit}
          onClose={onEditClose}
          ft={targetCommandFT!}
          ftId={targetCommandFT!.values.Id!}
        />
      )}
      {inEditMany && (
        <EditManyFTForm
          open={inEditMany}
          onClose={onEditManyClose}
          ft={targetCommandFT!}
          ftId={targetCommandFT!.values.Id!}
        />
      )}
      {inDelete && (
        <DeleteConfirmDialog
          open={inDelete}
          onClose={onDeleteClose}
          targetId={targetCommandFT!.values.Id!}
          targetName={"Ficha Técnica"}
          onDelete={onDelete}
        />
      )}
    </BaseStyledPage>
  );
};
