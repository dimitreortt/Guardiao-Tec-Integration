import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { GuardiaoTecInfoBox } from "./GuardiaoTecInfoBox";

type Props = {};

export const AdminHomePage: FunctionComponent<Props> = ({}) => {
  return (
    <div>
      <ResponsiveAppBar />
      {/* <GuardiaoTecInfoBox /> */}
    </div>
  );
};
