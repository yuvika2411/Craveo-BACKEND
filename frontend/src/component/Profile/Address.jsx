import React, { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../State/Authentication/Action";
import { api } from "../Config/api";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
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
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', pincode: '', type: 'Home' });

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        await api.put(`/api/users/addresses/${editingAddressId}`, newAddress);
      } else {
        await api.post("/api/users/addresses", newAddress);
      }
      dispatch(getUser());
      setIsAddressModalOpen(false);
      setNewAddress({ street: '', city: '', state: '', pincode: '', type: 'Home' });
      setEditingAddressId(null);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await api.delete(`/api/users/addresses/${addressId}`);
        dispatch(getUser());
      } catch (error) {
        console.error("Error deleting address:", error);
        alert("Failed to delete address. Please try again.");
      }
    }
  };

  const getAddressIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'work':
        return <WorkIcon fontSize="small" />;
      case 'other':
        return <LocationOnIcon fontSize="small" />;
      default:
        return <HomeIcon fontSize="small" />;
    }
  };

  const getAddressLabel = (type) => {
    if (!type) return 'Home';
    return type.charAt(0).toUpperCase() + type.slice(1);
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
          onClick={() => {
            setEditingAddressId(null);
            setNewAddress({ street: '', city: '', state: '', pincode: '', type: 'Home' });
            setIsAddressModalOpen(true);
          }}
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
                        {getAddressIcon(address.type)}
                    </div>
                    <h4 className="font-bold text-lg text-gray-200 tracking-wide">{getAddressLabel(address.type)}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {address.street ? `${address.street}, ${address.city}, ${address.state}, ${address.pincode}` : address.address}
                </p>
                <div className="mt-4 flex gap-3">
                  <span 
                    onClick={() => {
                      setNewAddress({ 
                        street: address.street || '', 
                        city: address.city || '', 
                        state: address.state || '', 
                        pincode: address.pincode || '', 
                        type: address.type || 'Home' 
                      });
                      setEditingAddressId(address.id);
                      setIsAddressModalOpen(true);
                    }}
                    className="text-[#ea580c] text-sm font-semibold cursor-pointer hover:underline"
                  >
                    Edit
                  </span>
                  <span 
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-500 text-sm font-semibold cursor-pointer hover:underline"
                  >
                    Delete
                  </span>
                </div>
            </div>
          ))}
        </div>
      )}

      {/* Address Modal */}
      <Modal 
        open={isAddressModalOpen} 
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditingAddressId(null);
        }}
      >
          <Box sx={modalStyle}>
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingAddressId ? "Edit Address" : "Add New Address"}
              </h2>
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
                  <div className="flex flex-col gap-2">
                      <label className="text-gray-400 text-sm font-medium">Address Type</label>
                      <div className="grid grid-cols-3 gap-3">
                          {['Home', 'Work', 'Other'].map((type) => (
                              <Button
                                  key={type}
                                  variant={newAddress.type === type ? "contained" : "outlined"}
                                  onClick={() => setNewAddress({ ...newAddress, type })}
                                  sx={{
                                      textTransform: 'none',
                                      fontWeight: 'bold',
                                      borderRadius: '10px',
                                      borderColor: newAddress.type === type ? '#ea580c' : 'rgba(255,255,255,0.2)',
                                      backgroundColor: newAddress.type === type ? '#ea580c' : 'transparent',
                                      color: newAddress.type === type ? 'white' : 'gray',
                                      '&:hover': {
                                          backgroundColor: newAddress.type === type ? '#c2410c' : 'rgba(255,255,255,0.05)',
                                          borderColor: '#ea580c',
                                      }
                                  }}
                              >
                                  {type}
                              </Button>
                          ))}
                      </div>
                  </div>
                  <Button 
                      type="submit" 
                      fullWidth 
                      variant="contained" 
                      sx={{ mt: 2, py: 1.5, backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}
                  >
                      {editingAddressId ? "Update Address" : "Save Address"}
                  </Button>
              </form>
          </Box>
      </Modal>
    </div>
  );
};

export default Address;
