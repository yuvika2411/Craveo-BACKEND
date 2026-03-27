import React from "react";
import "./App.css";
import Navbar from "./component/NavBar";
import Hero from "./component/Hero";
import Carousel from "./component/Carousel";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Hero />
      <Carousel />
    </ThemeProvider>
  );
};

export default App;