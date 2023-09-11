import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ my: 4 }}>
        <App />
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
