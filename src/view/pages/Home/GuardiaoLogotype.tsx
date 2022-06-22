import React, { FunctionComponent } from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

type Props = { size?: number };

export const GuardiaoLogotype: FunctionComponent<Props> = ({ size }) => {
  return (
    <>
      <Box sx={{}}>
        <Box sx={{}}>
          <img
            height={size ? size : 80}
            width={size ? size : 80}
            // src='https://firebasestorage.googleapis.com/v0/b/guardiaotec-tms.appspot.com/o/guardiao-tec-logo.jpeg?alt=media&token=477cdac6-cf85-4e76-b918-909ce8a99ebe'
            src="https://firebasestorage.googleapis.com/v0/b/guardiaotec-tms.appspot.com/o/guardiao-tec-logo-removebg-preview.png?alt=media&token=e99734ae-511b-464a-b0e7-d535ac9f7f80"
          ></img>
        </Box>
      </Box>
    </>
  );
};
