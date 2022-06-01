import { Box } from "@mui/system";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";
import { Driver } from "../../../domain/entities/Driver";
import { fetchDrivers } from "../../../infra/services/fetchDrivers";
import { CustomDriversTable } from "../Driver/CustomDriversTable";
import { checkIsCNHDueDate } from "./checkIsCNHDueDate";

type Props = {};

export const DriversFilteredByCNH: FunctionComponent<Props> = ({}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    fetchDrivers(setDrivers, true);
  }, [adminSelectedCompanyId, userCompanyId]);

  useEffect(() => {
    const filtered = drivers.filter((d) => {
      const isDueDateMonth = checkIsCNHDueDate(d.values.vencimento);
      return isDueDateMonth;
    });

    setFilteredDrivers(filtered);
  }, [drivers]);

  return (
    <Box sx={{ height: 370 }}>
      <CustomDriversTable
        drivers={filteredDrivers}
        onRowCommand={"" as any}
        noRowOptions={true}
        ommitFields={["contato"]}
      />
    </Box>
  );
};
