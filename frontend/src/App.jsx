import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./component/Navbar/NavBar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./component/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";

import { Home } from "./component/Home/Home";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";

const App = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store ) 

  useEffect(() => {
      dispatch(getUser(auth.jwt || jwt))
  }, [dispatch, auth.jwt, jwt])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-account" element={<Profile />} />
          <Route path="/account/register" element={
            <>
              <Home />
              <Auth />
            </>
          } />
          <Route path="/account/login" element={
            <>
              <Home />
              <Auth />
            </>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;