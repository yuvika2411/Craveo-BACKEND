import React from "react";
import "./App.css";
import Navbar from "./component/NavBar";
import Hero from "./component/Hero";
import Carousel from "./component/MenuCarousel";
import Restaurant from "./component/Restaurants";
import Cart from "./component/Cart";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      {/* <Hero />
      <Carousel />
      <Restaurant /> */}
      {/* <RestaurantDetails /> */}
      <Cart />
    </ThemeProvider>
  );
};

export default App;