import { Box, Card, CardContent, CardHeader } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";
import { getCompanyInfo } from "../../../application/service/getUserCompanyInfo";
import { GuardiaoTecInfoBox } from "./GuardiaoTecInfoBox";
// import { RootState } from '../application/store/configureStore';

type Props = {};

export const RegularHomePage: FunctionComponent<Props> = ({}) => {
  const [companyInfo, setCompanyInfo] = useState<any>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const getInfo = async (companyId: string) => {
      const info = await getCompanyInfo(companyId);
      setCompanyInfo(info);
    };
    if (user?.companyId) {
      getInfo(user.companyId);
    }
  }, [user?.companyId]);

  return (
    <div>
      <ResponsiveAppBar />
      {/* <GuardiaoTecInfoBox /> */}
      <Box
        sx={{
          flexGrow: 1,
          //   textAlign: 'center',
          fontSize: "2rem",
          fontWeight: "600",
          letterSpacing: 1.5,
          display: "flex",
          //   alignItems: 'center',
          justifyContent: "center",
          marginBottom: 1,
          marginTop: 1,
        }}
      >
        {/* <Typography variant='h1'>GuardiaoTech</Typography> */}
        <br />

        {/* <Card sx={{ width: 600, backgroundColor: '#ddddff' }}>
          <CardHeader title={companyInfo?.Transportadora} />
          <CardContent>
            Responsável: {companyInfo && companyInfo['Responsável']}
          </CardContent>
        </Card> */}
      </Box>
    </div>
  );
};
