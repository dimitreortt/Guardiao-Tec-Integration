import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { canRegister } from "../../../application/service/canRegister";

type Props = { to: string };

export const RegisterButton: FunctionComponent<Props> = ({ to }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        // mb: 2,
        mt: -2,
        pt: 2,
        pb: 2,
        backgroundColor: "white",
      }}
    >
      <Button
        component={Link}
        // to={`/workscale/register`}
        to={to}
        variant="contained"
        color="primary"
        disabled={!canRegister()}
      >
        Cadastrar
      </Button>
    </Box>
  );
};
