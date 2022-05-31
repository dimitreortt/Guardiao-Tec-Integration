import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FunctionComponent } from "react";

type Props = {
  data: {
    error: number;
    success: number;
  };
};

export const TMSReport: FunctionComponent<Props> = ({ data }) => {
  return (
    <div>
      <Box sx={{}}>
        <Box
          sx={{
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            borderColor: "red",
            borderRadius: "3px",
            borderWidth: "1px",
            borderBlockStyle: "solid",
            padding: 1,
            mb: 1,
            // color: "white",
          }}
        >
          <Typography component={"span"} sx={{ fontSize: 20 }}>
            Erros de TMS: {data.error}
          </Typography>
        </Box>
        <Box
          sx={{
            // backgroundColor: "rgba(0, 255, 0, 0.5)",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            borderColor: "green",
            borderRadius: "3px",
            borderWidth: "1px",
            borderBlockStyle: "solid",
            padding: 1,
            // color: "white",
          }}
        >
          <Typography component={"span"} sx={{ fontSize: 20 }}>
            TMS com sucesso: {data.success}
          </Typography>
        </Box>
        <Box></Box>
      </Box>
    </div>
  );
};
