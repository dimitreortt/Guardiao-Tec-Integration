import { Box, Card, CardActions, CardHeader, Typography } from "@mui/material";
import { TextField, Button } from "@mui/material";
import React, { ChangeEvent, FormEvent, FunctionComponent } from "react";
import { useState } from "react";
import { signIn } from "../../../firebase/auth";
import { AlertSnackbar } from "../../components/Common/AlertSnackbar";
import { GuardiaoLogotype } from "../Home/GuardiaoLogotype";

type Props = {};

export const LoginPage: FunctionComponent<Props> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  // const adminId = useSelector((state: RootState) => state.auth.adminId);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      setSuccessMessage("Login bem sucedido");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "65px",
          backgroundColor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "center",
          verticalAlign: "center",
          marginBottom: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <GuardiaoLogotype size={43} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">GuardiaoTec</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            "& > *": {
              //   margin: 1,
              //   width: '95%',
              marginBottom: 1,
            },
            // marginBottom: 1,
            width: "400px",
            padding: "10px",
          }}
        >
          <CardHeader title="Autenticação" />
          <Box sx={{ mb: 1.3 }}>
            <TextField
              id="standard-basic"
              type="email"
              value={email}
              onChange={handleEmail}
              label="E-mail"
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 1.3 }}>
            <TextField
              id="standard-basic1"
              type="password"
              value={password}
              onChange={handlePassword}
              label="Senha"
              fullWidth
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            onClick={handleLogin}
          >
            Login
          </Button>
          {/* <Box>
          </Box> */}
        </Card>
      </Box>
      <AlertSnackbar open={!!error} onClose={onAlertClose} severity="warning">
        {error}
      </AlertSnackbar>
      <AlertSnackbar
        open={!!successMessage}
        onClose={onAlertClose}
        severity="success"
      >
        {successMessage}
      </AlertSnackbar>
    </>
  );
};
