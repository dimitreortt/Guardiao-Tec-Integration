import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
// import { Driver } from '../../../domain/entities/Driver';

type Props = {
  targets: any[];
  setFilteredTargets: (targets: any) => void;
  filterField: string;
  filterName: string;
};

export const TargetFilter: FunctionComponent<Props> = ({
  targets,
  setFilteredTargets,
  filterField,
  filterName,
}) => {
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    // if (!filterText) setFilteredTargets(targets);
    let filteredTargets = targets.filter((d: any) => {
      return d.values[filterField]
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase());
    });
    setFilteredTargets(filteredTargets);
  }, [filterText, targets]);

  const handleChange = (e: any) => {
    setFilterText(e.target.value);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: 220,
        top: 80,
      }}
    >
      <Box sx={{ mb: 1.3 }}>
        <TextField
          id="driverfilter"
          label={filterName}
          value={filterText}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};
