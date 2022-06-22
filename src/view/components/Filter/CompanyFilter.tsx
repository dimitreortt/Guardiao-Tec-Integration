import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { dispatchSetAdminSelectedCompanyId } from "../../../application/store/actions/company";
import { RootState } from "../../../application/store/configureStore";
import { Company } from "../../../domain/entities/Company";
import { fetchCompanies } from "../../../infra/services/fetchCompanies";
import { useSelector } from "react-redux";

type Props = {};

export const CompanyFilter: FunctionComponent<Props> = ({}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const { isAdmin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAdmin) fetchCompanies(setCompanies);
  }, [isAdmin]);

  const handleSelectCompany = (event: SelectChangeEvent) => {
    const companyId = event.target.value;
    dispatchSetAdminSelectedCompanyId(companyId);
  };

  return (
    <Box sx={{ position: "absolute", left: 10, top: 80 }}>
      <Box sx={{ mb: 1.3 }}>
        <FormControl sx={{ minWidth: 200 }} fullWidth>
          <InputLabel id="demo-simple-select-helper-label">
            Transportadora
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={adminSelectedCompanyId || ""}
            label={"Transportadora"}
            onChange={handleSelectCompany}
            fullWidth
          >
            {companies &&
              companies
                .map((company: Company) => {
                  return (
                    <MenuItem
                      key={company.values.CNPJ}
                      value={company.values.Id!}
                    >
                      {company.values.Transportadora}
                    </MenuItem>
                  );
                })
                .concat([
                  <MenuItem key={"unique"} value={"Todas"}>
                    Todas
                  </MenuItem>,
                ])}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
