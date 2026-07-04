import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./component/Navbar/NavBar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt))
    }
  }, [dispatch, auth.jwt, jwt])

  // While fetching initial profile role, show loader to prevent routing flash
  if (jwt && auth.loading && !auth.user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0d0d] text-white">
        <div className="text-xl font-bold tracking-wider animate-pulse">Loading Craveo...</div>
      </div>
    );
  }

  const isRestaurantOwner = auth.user?.role === "ROLE_RESTAURANT_OWNER";

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {isRestaurantOwner ? (
            <>
              {/* Restaurant Owner only has access to admin dashboard */}
              <Route path="/admin/restaurant/*" element={<AdminRoute />} />
              {/* Redirect any other client routes back to dashboard */}
              <Route path="*" element={<Navigate to="/admin/restaurant" replace />} />
            </>
          ) : (
            <>
              {/* Customers & guests have access to customer pages */}
              <Route path="/*" element={<CustomerRoute />} />
              {/* Redirect any admin dashboard attempts to customer home */}
              <Route path="/admin/restaurant/*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;