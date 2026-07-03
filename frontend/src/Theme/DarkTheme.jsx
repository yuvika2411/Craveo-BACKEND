import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#ea580c",
    },

    secondary: {
      main: "#5A20CB",
    },
    black:{
        main:'#242B2E'
    },
    background: {
      main:"#0000000",
      default: "#0D0D0D",
      paper: "#121212",
    },

    textColor: {
      main: "#111111"
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});