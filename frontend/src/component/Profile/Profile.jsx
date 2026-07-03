import React, { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Favorites from "./Favorites";
import Address from "./Address";
import Payments from "./Payments";

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
    <div className="lg:flex justify-between mt-24 max-w-7xl mx-auto px-6 gap-8 pb-10">
      <div className="sticky top-28 h-fit lg:w-[25%] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-[#101010] py-4 border border-white/5">
        <ProfileNavigation 
          open={openSideBar} 
          handleClose={() => setOpenSideBar(false)} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      <div className="lg:w-[75%] mt-8 lg:mt-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
