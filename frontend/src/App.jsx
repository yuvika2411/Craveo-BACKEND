import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./component/Navbar/NavBar";
import Hero from "./component/Home/Hero";
import Carousel from "./component/Home/MenuCarousel";
import Restaurant from "./component/Restaurant/Restaurants";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./component/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";

const App = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store ) 

  useEffect(() => {
      dispatch(getUser(auth.jwt || jwt))
  },[])

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