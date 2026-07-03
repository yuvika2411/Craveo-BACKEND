import React from "react";
import { Drawer, useMediaQuery } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";

const menu = [
  { title: "Profile", icon: <AccountCircleIcon /> },
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Address", icon: <HomeIcon /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Events", icon: <EventIcon /> },
  { title: "Logout", icon: <LogoutIcon /> },
];

const ProfileNavigation = ({ open, handleClose, activeTab, onTabChange }) => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
       navigate("/");
    } else {
      onTabChange(item.title);
      if (isSmallScreen) {
        handleClose();
      }
    }
  };

  const navContent = (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          My <span className="text-[#ea580c]">Account</span>
        </h1>
      </div>

      <div className="flex flex-col flex-1 gap-2 px-4">
        {menu.map((item, i) => (
          <div
            key={i}
            onClick={() => handleNavigate(item)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
              activeTab === item.title
                ? "bg-[#ea580c] text-white shadow-lg shadow-[#ea580c]/30"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {React.cloneElement(item.icon, {
              sx: { color: activeTab === item.title ? "white" : "inherit" }
            })}
            <span className="font-semibold text-[15px]">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {isSmallScreen ? (
        <Drawer
          variant="temporary"
          onClose={handleClose}
          open={open}
          anchor="left"
          sx={{
            zIndex: 100,
            "& .MuiDrawer-paper": {
              width: "70vw",
              minWidth: "250px",
              backgroundColor: "#101010",
              borderRight: "1px solid rgba(255,255,255,0.1)"
            },
          }}
        >
          {navContent}
        </Drawer>
      ) : (
        <div className="w-full h-full bg-transparent">
          {navContent}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfileNavigation;
