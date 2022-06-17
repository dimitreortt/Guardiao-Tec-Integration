import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FunctionComponent, useEffect } from "react";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import { CompanyFilter } from "../../components/Filter/CompanyFilter";
import BasicTabs from "./BasicTabs";
import { DataBox } from "./DataBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";
import { fetchUsers } from "../../../infra/services/fetchUsers";
import { UsersList } from "./UsersList";
import { getCurrentMonthString } from "./getCurrentMonthString";
import { DriversFilteredByCNH } from "./DriversFilteredByCNH";
import { DashboardLicensesTable } from "../../components/DashboardLicensesTable/DashboardLicensesTable";

type Props = {};

export const AdminDashboard: FunctionComponent<Props> = ({}) => {
  const { isAdmin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          //   border: "1px solid black",
        }}
      >
        <Box
          sx={{
            width: 1400,
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: "5px",
            mb: 2,
            p: 0.5,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <DataBox title="Relatórios">
                <Box sx={{ position: "relative", top: -80, mb: 8, left: -10 }}>
                  <CompanyFilter />
                </Box>
                <BasicTabs />
              </DataBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <DataBox title="Usuários">
                <UsersList />
              </DataBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <DataBox title="CNHs">
                <Typography textAlign="center" gutterBottom>
                  CNHs com vencimento em <b>{getCurrentMonthString()}</b>
                </Typography>
                <DriversFilteredByCNH />
              </DataBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <DataBox title="Licenciamentos">
                <Typography textAlign="center" gutterBottom>
                  Veículos com vencimento do licenciamento em{" "}
                  <b>{getCurrentMonthString()}</b>
                </Typography>
                {/* <DriversFilteredByCNH /> */}
                <DashboardLicensesTable />
              </DataBox>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
