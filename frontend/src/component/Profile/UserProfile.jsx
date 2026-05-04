import React from "react";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center bg-[#1a1a1a] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ea580c]/10 rounded-full blur-3xl"></div>
      <div className="flex flex-col items-center justify-center relative z-10">
        <AccountCircleIcon sx={{ fontSize: "9rem", color: "#ea580c" }} />
        <h1 className="py-5 text-3xl font-bold tracking-wider text-white">{auth.user?.fullName || "Guest User"}</h1>
        <p className="text-gray-400 pb-8 text-lg font-medium">{auth.user?.email || "Not logged in"}</p>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ 
            padding: "0.8rem 2.5rem", 
            backgroundColor: "#ea580c", 
            fontSize: "1.1rem",
            fontWeight: "bold",
            borderRadius: "50px",
            textTransform: "none",
            boxShadow: "0 10px 20px -5px rgba(234, 88, 12, 0.4)",
            "&:hover": { 
              backgroundColor: "#c2410c",
              transform: "translateY(-2px)",
              boxShadow: "0 15px 25px -5px rgba(234, 88, 12, 0.5)"
            },
            transition: "all 0.3s ease"
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
