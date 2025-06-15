import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { IPDCLightTheme, IPDCDarkTheme } from './theme/IPDCTheme';
//import 
import UserContextProvider from "./services/contexts/UserContextProvider";

function Root() {
  const { isDarkMode } = useTheme();
  return (
    <MuiThemeProvider theme={isDarkMode ? IPDCDarkTheme : IPDCLightTheme}>
      <App />
    </MuiThemeProvider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<ErrorBoundary>
  <UserContextProvider>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </UserContextProvider>
  //</ErrorBoundary>
);
