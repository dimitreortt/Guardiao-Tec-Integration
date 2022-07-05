import React, { FunctionComponent } from "react";
import { CustomTable } from "../../components/Table/CustomTable";
import { Vinculo } from "../../../domain/entities/Vinculo";
import { useEffect } from "react";
import { useState } from "react";
import { VinculoRepositoryDatabase } from "../../../infra/repository/VinculoRepositoryDatabase";
import { RootState } from "../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { fetchVinculos } from "../../../infra/services/fetchVinculos";
import { CompanyFilter } from "../../components/Filter/CompanyFilter";
import { RowCommand } from "../../components/Table/TableRowOptions";
import { selectCurrentRelatedCompanyId } from "../../../infra/services/selectCurrentRelatedCompanyId";
import { DeleteConfirmDialog } from "../Common/DeleteConfirmDialog";
import { EditVinculoForm } from "../../components/Forms/Vinculo/EditVinculoForm";
import { RegisterButton } from "../Common/RegisterButton";
import { BaseStyledPage } from "../Common/BaseStyledPage";

type Props = {};

export const VinculoPage: FunctionComponent<Props> = ({}) => {
  const [vinculos, setVinculos] = useState<Vinculo[]>([]);
  const [filteredVinculos, setFilteredVinculos] = useState<Vinculo[]>([]);
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandVinculo, setTargetCommandVinculo] = useState<Vinculo>();
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const { isAdmin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (adminSelectedCompanyId || userCompanyId) {
      fetchVinculos(setVinculos);
    }
  }, [adminSelectedCompanyId, userCompanyId]);

  useEffect(() => {
    setFilteredVinculos(vinculos);
  }, [vinculos]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const vinculo of filteredVinculos) {
      rows.push([
        vinculo.values["Ficha Técnica"],
        vinculo.values["Transportadora"],
        vinculo.values["Veículo"],
        vinculo.values["Motorista"],
        vinculo.values["Motorista 2"],
        vinculo.values["Plano de Viagem"],
      ]);
    }
    return rows;
  };

  const vinculosTableHead = [
    "Ficha Técnica",
    "Transportadora",
    "Veículo",
    "Motorista",
    "Motorista 2",
    "Plano de Viagem",
    "",
  ];

  const vinculosTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    const vinculo = vinculos.find((v) => v.values["Ficha Técnica"] === row[0]);
    if (!vinculo) return;
    setTargetCommandVinculo(vinculo);
    if (command === "edit") setInEdit(true);
    if (command === "delete") setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchVinculos(setVinculos);
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchVinculos(setVinculos);
  };

  const onDelete = async (vinculoId: string) => {
    const repo = new VinculoRepositoryDatabase();
    let companyId = await selectCurrentRelatedCompanyId();
    if (!companyId)
      throw new Error(
        "Id de transportadora não identificado! Impossível deletar veículo!"
      );
    await repo.deleteVinculo(companyId, vinculoId);
  };

  return (
    <BaseStyledPage>
      {isAdmin && <CompanyFilter />}
      <RegisterButton to={`/vinculo/register`} />
      {/* <Box
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center", mb: 2 }}
      >
        <Button
          component={Link}
          variant="contained"
          color="primary"
          disabled={!canRegister()}
        >
          Cadastrar
        </Button>
      </Box> */}
      <CustomTable
        tableHead={vinculosTableHead}
        tableRows={vinculosTableRows}
        onRowCommand={onRowCommand}
      />
      {inEdit && (
        <EditVinculoForm
          open={inEdit}
          onClose={onEditClose}
          vinculo={targetCommandVinculo!}
          vinculoId={targetCommandVinculo!.values.Id!}
        />
      )}
      {inDelete && (
        <DeleteConfirmDialog
          open={inDelete}
          onClose={onDeleteClose}
          targetId={targetCommandVinculo!.values.Id!}
          targetName={"Vínculo"}
          onDelete={onDelete}
        />
      )}
    </BaseStyledPage>
  );
};
