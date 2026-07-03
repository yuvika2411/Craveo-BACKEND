import React, { useState } from "react";
import { Button, Modal, Box, TextField, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../State/Authentication/Action";
import { api } from "../Config/api";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
};

const inputStyle = {
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
        '&:hover fieldset': { borderColor: '#ea580c' },
        '&.Mui-focused fieldset': { borderColor: '#ea580c' },
    },
    '& .MuiInputLabel-root': { color: 'gray' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c' },
};

const UserProfile = () => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({ fullName: '', email: '' });

  const handleOpenEditModal = () => {
    setProfileData({
      fullName: auth.user?.fullName || '',
      email: auth.user?.email || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put("/api/users/profile", profileData);
      dispatch(getUser());
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const primaryAddress = auth.user?.addresses?.[0];
  const locationText = primaryAddress 
    ? `${primaryAddress.city}, ${primaryAddress.state}` 
    : "No address saved";

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 shadow-xl flex items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c]/5 rounded-full blur-3xl"></div>
        
        {/* Avatar Container */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#ea580c] to-[#c2410c] flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg border-2 border-white/10 shrink-0 z-10">
          {getInitials(auth.user?.fullName)}
        </div>
        
        {/* Info Container */}
        <div className="z-10">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            {auth.user?.fullName || "Guest User"}
          </h2>
          <p className="text-gray-400 font-medium mt-1 text-sm">
            {auth.user?.role?.replace("ROLE_", "") || "CUSTOMER"}
          </p>
          <p className="text-gray-500 mt-2 text-xs flex items-center gap-1">
            📍 {locationText}
          </p>
        </div>
      </div>

      {/* Bottom Personal Info Card */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ea580c]/5 rounded-full blur-3xl"></div>

        {/* Card Header */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-lg font-bold text-white tracking-wide">Personal Information</h3>
          {auth.user && (
            <Button
              variant="contained"
              onClick={handleOpenEditModal}
              startIcon={<EditIcon sx={{ fontSize: "1rem !important" }} />}
              sx={{
                backgroundColor: "#ea580c",
                fontSize: "0.85rem",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                py: 0.75,
                boxShadow: "0 4px 10px rgba(234, 88, 12, 0.2)",
                "&:hover": { 
                  backgroundColor: "#c2410c",
                  boxShadow: "0 6px 15px rgba(234, 88, 12, 0.3)" 
                },
                transition: "all 0.3s ease"
              }}
            >
              Edit
            </Button>
          )}
        </div>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 4 }} />

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Full Name</span>
            <p className="text-base font-semibold text-white mt-1.5">{auth.user?.fullName || "Guest User"}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Email Address</span>
            <p className="text-base font-semibold text-white mt-1.5">{auth.user?.email || "Not logged in"}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">User Role</span>
            <p className="text-base font-semibold text-[#ea580c] mt-1.5">
              {auth.user?.role?.replace("ROLE_", "") || "CUSTOMER"}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box sx={modalStyle}>
          <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <TextField 
              label="Full Name" 
              fullWidth 
              required 
              sx={inputStyle}
              value={profileData.fullName}
              onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
            />
            <TextField 
              label="Email Address" 
              fullWidth 
              required 
              type="email"
              sx={inputStyle}
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            />
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 2, py: 1.5, backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}
            >
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfile;
