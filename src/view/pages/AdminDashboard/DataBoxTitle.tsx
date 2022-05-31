import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

type Props = {
  title: string;
};

export const DataBoxTitle: FunctionComponent<Props> = ({ title }) => {
  return (
    <Typography
      variant="h2"
      sx={{
        // fontSize: 20,
        m: 1,
        color: "#666e",
      }}
    >
      {title}
    </Typography>
  );
};
