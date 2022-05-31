import { Box } from "@mui/system";
import React, { FunctionComponent } from "react";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import { CompanyFilter } from "../../components/Filter/CompanyFilter";
import BasicTabs from "./BasicTabs";

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
        <Box sx={{ width: 800 }}>
          <Box sx={{ position: "relative", top: -80, mb: 8, left: -10 }}>
            <CompanyFilter />
          </Box>
          <BasicTabs />
        </Box>
      </Box>
    </div>
  );
};
