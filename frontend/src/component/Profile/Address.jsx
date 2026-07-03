import React, { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
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

const Address = () => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const addresses = auth.user?.addresses || [];

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', pincode: '' });

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users/addresses", newAddress);
      dispatch(getUser());
      setIsAddressModalOpen(false);
      setNewAddress({ street: '', city: '', state: '', pincode: '' });
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
    }
  };

  return (
    <div className="h-full bg-[#0f0f0f] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Saved Addresses</h1>
        <Button 
          variant="contained" 
          startIcon={<AddLocationAltIcon />}
          sx={{ 
            backgroundColor: "#ea580c", 
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#c2410c" } 
          }}
          onClick={() => setIsAddressModalOpen(true)}
        >
          Add New
        </Button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 border border-white/5 bg-[#151515] rounded-2xl min-h-[200px]">
          <span className="text-5xl mb-4">📍</span>
          <p className="text-lg font-semibold text-gray-300">No saved addresses found.</p>
          <p className="text-sm text-gray-500 mt-1">You can save a new address here or during checkout.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((address) => (
            <div 
                key={address.id} 
                className="bg-[#151515] rounded-2xl p-6 transition-all duration-300 flex flex-col min-h-[160px] border border-white/5 hover:border-[#ea580c]/50 hover:bg-[#1a1a1a] group"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-[#222] text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white transition-colors duration-300">
                        <HomeIcon fontSize="small" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-200 tracking-wide">Home</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {address.street ? `${address.street}, ${address.city}, ${address.state}, ${address.pincode}` : address.address}
                </p>
                <div className="mt-4 flex gap-3">
                  <span className="text-[#ea580c] text-sm font-semibold cursor-pointer hover:underline">Edit</span>
                  <span className="text-red-500 text-sm font-semibold cursor-pointer hover:underline">Delete</span>
                </div>
            </div>
          ))}
        </div>
      )}

      {/* Address Modal */}
      <Modal open={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)}>
          <Box sx={modalStyle}>
              <h2 className="text-2xl font-bold text-white mb-6">Add New Address</h2>
              <form onSubmit={handleAddNewAddress} className="flex flex-col gap-4">
                  <TextField 
                      label="Street Address" 
                      fullWidth 
                      required 
                      sx={inputStyle}
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                      <TextField 
                          label="City" 
                          required 
                          sx={inputStyle}
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      />
                      <TextField 
                          label="State" 
                          required 
                          sx={inputStyle}
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      />
                  </div>
                  <TextField 
                      label="Pincode" 
                      fullWidth 
                      required 
                      sx={inputStyle}
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                  />
                  <Button 
                      type="submit" 
                      fullWidth 
                      variant="contained" 
                      sx={{ mt: 2, py: 1.5, backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}
                  >
                      Save Address
                  </Button>
              </form>
          </Box>
      </Modal>
    </div>
  );
};

export default Address;
