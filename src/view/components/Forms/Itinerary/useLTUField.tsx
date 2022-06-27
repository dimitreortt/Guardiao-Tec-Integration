import { selectCurrentRelatedCompanyId } from "../../../../infra/services/selectCurrentRelatedCompanyId";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FTRepositoryDatabase } from "../../../../infra/repository/FTRepositoryDatabase";
import { FT } from "../../../../domain/entities/FT";
import { useSelector } from "react-redux";
import { RootState } from "../../../../application/store/configureStore";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

export const useLTUField = () => {
  const [fts, setFTs] = useState<FT[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
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
    fetch();
  }, [selectedCompanyId]);

  useEffect(() => {
    setOptions(fts.map((ft) => ft.values["Nº da Linha"]));
  }, [fts]);

  // useEffect(() => {
  //   setFilteredOptions(options.filter((o) => o.includes(ltuFilter)));
  // }, [ltuFilter, options]);

  const onOpen = () => setIsSelectorOpen((prev) => !prev);

  const onClose = () => setIsSelectorOpen(false);

  console.log(isSelectorOpen);

  const label = "LTU Correspondente";

  return ({ onChange, value, helperText, ltuFilter }: any) => {
    const handleChange = (event: SelectChangeEvent) => {
      // setValue(event.target.value);
      onChange(label, event.target.value);
    };

    const filteredOptions = options.filter((o) => o.includes(ltuFilter));

    return (
      <React.Fragment>
        <FormControl sx={{ minWidth: 120 }} fullWidth>
          <InputLabel id="demo-simple-select-helper-label">
            {"LTU Correspondente"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={value || ""}
            label={"LTU Correspondente"}
            onChange={handleChange}
            // onOpen={onOpen}
            // onClose={onClose}
            fullWidth
          >
            {filteredOptions &&
              filteredOptions.map((option: string) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      </React.Fragment>
    );
  };
};
