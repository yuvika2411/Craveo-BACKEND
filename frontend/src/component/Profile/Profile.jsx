import React, { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Favorites from "./Favorites";
import Address from "./Address";
import Payments from "./Payments";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <UserProfile />;
      case "Orders":
        return <Orders />;
      case "Favorites":
        return <Favorites />;
      case "Address":
        return <Address />;
      case "Payments":
        return <Payments />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="lg:flex justify-between mt-24 max-w-7xl mx-auto px-6 gap-8 pb-10 font-[Poppins]">
      
      {/* Mobile Header & Sidebar Menu Trigger */}
      <div className="lg:hidden flex items-center justify-between bg-[#101010] border border-white/5 px-5 py-3.5 rounded-xl mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Account Settings</span>
          <span className="text-lg font-bold text-white tracking-wide">{activeTab}</span>
        </div>
        <IconButton 
          onClick={() => setOpenSideBar(true)}
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255,255,255,0.05)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } 
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block sticky top-28 h-fit lg:w-[25%] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-[#101010] py-4 border border-white/5">
        <ProfileNavigation 
          open={openSideBar} 
          handleClose={() => setOpenSideBar(false)} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Mobile Drawer Navigation (mounted outside the hidden desktop div) */}
      <div className="lg:hidden">
        <ProfileNavigation 
          open={openSideBar} 
          handleClose={() => setOpenSideBar(false)} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <div className="lg:w-[75%] w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
