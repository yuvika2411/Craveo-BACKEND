import React from "react";
import "./App.css";
import Navbar from "./component/NavBar";
import { darkTheme } from "./Theme/DarkTheme";

import { ThemeProvider, CssBaseline } from "@mui/material";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
    </ThemeProvider>
  );
};

export default App;