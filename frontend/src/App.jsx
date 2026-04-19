import React from "react";
import "./App.css";
import Navbar from "./component/NavBar";
import Hero from "./component/Hero";
import Carousel from "./component/MenuCarousel";
import Restaurant from "./component/Restaurants";
import Cart from "./component/Cart";
import Profile from "./component/Profile/Profile";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./component/Auth/Auth";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              {/* Using fragments as Home Page currently */}
              <Hero />
              <Carousel />
              <Restaurant />
            </>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account/register" element={
            <>
              <Hero />
              <Carousel />
              <Restaurant />
              <Auth />
            </>
          } />
          <Route path="/account/login" element={
            <>
              <Hero />
              <Carousel />
              <Restaurant />
              <Auth />
            </>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;