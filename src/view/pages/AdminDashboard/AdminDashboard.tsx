import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FunctionComponent } from "react";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import { CompanyFilter } from "../../components/Filter/CompanyFilter";
import BasicTabs from "./BasicTabs";
import { DataBoxTitle } from "./DataBoxTitle";
import { DataBox } from "./DataBox";

type Props = {};

export const AdminDashboard: FunctionComponent<Props> = ({}) => {
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
            width: 1200,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <DataBox title="Relatórios">
                <Box sx={{ position: "relative", top: -80, mb: 8, left: -10 }}>
                  <CompanyFilter />
                </Box>
                <BasicTabs />
              </DataBox>
            </Grid>
            <Grid item xs={6}>
              <DataBox title="Usuários"></DataBox>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
