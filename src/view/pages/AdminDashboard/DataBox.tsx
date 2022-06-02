import { Box, Divider } from "@mui/material";
import React, { FunctionComponent } from "react";
import { DataBoxTitle } from "./DataBoxTitle";

type Props = {
  title: string;
};

export const DataBox: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "#aaa",
        p: 1,
        borderRadius: "5px",
        minHeight: 500,
      }}
    >
      <DataBoxTitle title={title} />
      <Divider sx={{ mb: 1 }} />
      {children}
    </Box>
  );
};
