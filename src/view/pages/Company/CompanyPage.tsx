import React, { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import { Link } from "react-router-dom";
import { CustomTable } from "../../components/Table/CustomTable";
import { useState } from "react";
import { Company } from "../../../domain/entities/Company";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CompanyRepositoryDatabase } from "../../../infra/repository/CompanyRepositoryDatabase";
import { RootState } from "../../../application/store/configureStore";
import { TargetFilter } from "../Common/TargetFilter";
import { RowCommand } from "../../components/Table/TableRowOptions";
import { EditCompanyForm } from "../../components/Forms/Company/EditCompanyForm";
import { DeleteConfirmDialog } from "../Common/DeleteConfirmDialog";
import { fetchCompanies } from "../../../infra/services/fetchCompanies";
import { RegisterButton } from "../Common/RegisterButton";
import { BaseStyledPage } from "../Common/BaseStyledPage";

type Props = {};

export const CompanyPage: FunctionComponent<Props> = ({}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const { userId, isAdmin, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandCompany, setTargetCommandCompany] = useState<Company>();

  // const fetchCompanies = async () => {
  //   const repo = new CompanyRepositoryDatabase();
  //   const companies = await repo.getCompanies();
  //   setCompanies(companies);
  // };

  useEffect(() => {
    fetchCompanies(setCompanies);
  }, [user?.companyId, adminSelectedCompanyId]);

  useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const company of filteredCompanies) {
      rows.push([
        company.values["Transportadora"],
        company.values["CNPJ"],
        company.values["Contato"],
        company.values["Email"],
        company.values["Responsável"],
      ]);
    }
    return rows;
  };

  const companiesTableHead = [
    "Transportadora",
    "CNPJ",
    "Contato",
    "Email",
    "Responsável",
    "",
  ];
  const companiesTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    const company = companies.find((c) => c.values.CNPJ === row[1]);
    if (!company) return;
    setTargetCommandCompany(company);
    if (command === "edit") setInEdit(true);
    if (command === "delete") setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchCompanies(setCompanies);
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchCompanies(setCompanies);
  };

  const onDelete = async (companyId: string) => {
    const repo = new CompanyRepositoryDatabase();
    await repo.deleteCompany(companyId);
  };

  return (
    <BaseStyledPage>
      {isAdmin && (
        <TargetFilter
          targets={companies}
          setFilteredTargets={setFilteredCompanies}
          filterField="Transportadora"
          filterName="Filtrar por nome"
        />
      )}
      <RegisterButton to={`/company/register`} />
      <CustomTable
        tableHead={companiesTableHead}
        tableRows={companiesTableRows}
        onRowCommand={onRowCommand}
      />
      {inEdit && (
        <EditCompanyForm
          open={inEdit}
          onClose={onEditClose}
          company={targetCommandCompany!}
          companyId={targetCommandCompany!.values.Id!}
        />
      )}
      {inDelete && (
        <DeleteConfirmDialog
          open={inDelete}
          onClose={onDeleteClose}
          targetId={targetCommandCompany!.values.Id!}
          targetName={"Transportadora"}
          onDelete={onDelete}
        />
      )}
    </BaseStyledPage>
  );
};
