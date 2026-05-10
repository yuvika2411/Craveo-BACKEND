import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./component/Navbar/NavBar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./component/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/State/Authentication/Action";
import ProtectedRoute from "./Routers/ProtectedRoute";

import { CustomerRoute } from "./Routers/CustomerRoute";
import { AdminRoute } from "./Routers/AdminRoute";

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
        <Routes>
          <Route path="/admin/restaurant/*" element={<AdminRoute />} />
          <Route path="/*" element={<CustomerRoute />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;