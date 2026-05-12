import React from "react";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
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
        <div className="w-[100%] flex flex-col pt-5">
          <div className="px-5 pb-2">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              My <span className="text-[#ea580c]">Account</span>
            </h2>
          </div>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", marginBottom: "0.5rem" }} />
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div
                onClick={() => handleNavigate(item)}
                className={`px-5 py-3 mx-4 rounded-lg flex items-center space-x-4 cursor-pointer transition duration-300 ${
                  activeTab === item.title
                    ? "bg-[#ea580c] text-white font-semibold shadow-lg shadow-orange-500/30"
                    : "text-gray-300 hover:bg-[#ea580c]/10 hover:text-[#ea580c]"
                }`}
              >
                {React.cloneElement(item.icon, {
                  sx: { color: activeTab === item.title ? "white" : "inherit" }
                })}
                <span className="text-lg">{item.title}</span>
              </div>
              {i !== menu.length - 1 && (
                <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", marginY: "0.2rem" }} />
              )}
            </React.Fragment>
          ))}
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
