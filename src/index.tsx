import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./view/materialUI/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouter } from "./routers/AppRouter";
import { store } from "./application/store/configureStore";
import { Provider } from "react-redux";
import { Box } from "@mui/system";
import bgRef from "./assets/bg.jpeg";

ReactDOM.render(
  <React.StrictMode>
    <Box
      sx={{
        backgroundImage: `url(${bgRef})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ThemeProvider>
    </Box>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
