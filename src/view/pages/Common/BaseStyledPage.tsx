import { Box } from "@mui/system";
import React, { FunctionComponent } from "react";
import { ResponsiveAppBar } from "../../components/Common/AppBar";
import bgRef from "../../../assets/bg.jpeg";

type Props = {
  children?: React.ReactNode;
};

export const BaseStyledPage: FunctionComponent<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgRef})`,
        // "url(https://i.pinimg.com/originals/c7/a0/ba/c7a0ba9fe40aca44f660f32fb4ad2545.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        // backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <ResponsiveAppBar />
      {/* <Box sx={{ width: 1500, maxWidth: 1500 }}>{children}</Box> */}

      <Box
        sx={{
          //   backgroundColor: "rgba(255, 255, 255, 0.5)",
          minHeight: "100vh",
          //   minHeight: "100%",
          marginTop: -2,
          pt: 2,
          //   display: "flex",
          //   flexDirection: "column",
        }}
      >
        <Box sx={{ px: 1, mt: 0 }}>{children}</Box>

        {/* <Box
          sx={{
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
          }}
        >
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box> */}
      </Box>
    </Box>
  );
};
