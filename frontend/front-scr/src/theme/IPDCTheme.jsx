import { createTheme } from "@mui/material/styles";

const IPDCLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#42a147",
    },
    secondary: {
      main: "#238ebc",
    },
    error: {
      main: '#e53935',
    },
    neutral: {
      main: "rgba(128, 128, 128, 0.699)",
    },
/*    background: {
      default: '#f5f5f5',
    },*/
  },
  typography: {
    fontFamily: [
      "Arial, sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const IPDCDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    error: {
      main: '#ef5350',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
  typography: {
    fontFamily: IPDCLightTheme.typography.fontFamily, // Use the same font family as light theme for consistency
  },
});

export { IPDCDarkTheme, IPDCLightTheme };
/*const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      main: "#00ff00",
      dark: "#009688",
    },
  },
});*/
