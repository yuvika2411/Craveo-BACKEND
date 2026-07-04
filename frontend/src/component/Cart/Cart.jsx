import React, { useState, useEffect } from 'react';
import { Button, Divider, IconButton, Modal, Box, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useDispatch, useSelector } from 'react-redux';
import { findCart, updateCartItem, removeCartItem } from '../State/Cart/Action';
import { createOrder } from '../State/Order/Action';
import { api } from '../Config/api';
import { getUser } from '../State/Authentication/Action';
//cart component l
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

const Cart = () => {

    const { cart, auth } = useSelector(store => store);
    const dispatch = useDispatch();

     const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', pincode: '', type: 'Home' });
    const [localAddresses, setLocalAddresses] = useState([]);

    const allAddresses = [...(auth.user?.addresses || []), ...localAddresses];

    useEffect(() => {
        dispatch(findCart());
    }, [dispatch]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return 'https://via.placeholder.com/100';
        return imagePath.startsWith("http") ? imagePath : `${import.meta.env.VITE_API_URL}${imagePath}`;
    };

    const handleQuantityChange = (item, delta) => {
        if (item.quantity + delta === 0) {
            dispatch(removeCartItem(item.id));
        } else {
            dispatch(updateCartItem({
                cartItemId: item.id,
                quantity: item.quantity + delta
            }));
        }
    };

    const handleAddNewAddress = async (e) => {
        e.preventDefault();
        try {
            if (auth.user) {
                const { data } = await api.post("/api/users/addresses", newAddress);
                dispatch(getUser());
                if (data && data.addresses) {
                    const latestAddress = data.addresses[data.addresses.length - 1];
                    setSelectedAddress(latestAddress);
                }
                setIsAddressModalOpen(false);
                setNewAddress({ street: '', city: '', state: '', pincode: '', type: 'Home' });
            } else {
                const addressObj = { ...newAddress, id: Date.now() };
                setLocalAddresses([...localAddresses, addressObj]);
                setSelectedAddress(addressObj);
                setIsAddressModalOpen(false);
                setNewAddress({ street: '', city: '', state: '', pincode: '', type: 'Home' });
            }
        } catch (error) {
            console.error("Error adding address:", error);
            const addressObj = { ...newAddress, id: Date.now() };
            setLocalAddresses([...localAddresses, addressObj]);
            setSelectedAddress(addressObj);
            setIsAddressModalOpen(false);
            setNewAddress({ street: '', city: '', state: '', pincode: '', type: 'Home' });
        }
    };

    const getAddressIcon = (type, isSelected) => {
        const sxColor = { color: isSelected ? '#ea580c' : 'gray', mt: 0.5 };
        switch (type?.toLowerCase()) {
            case 'work':
                return <WorkIcon sx={sxColor} />;
            case 'other':
                return <LocationOnIcon sx={sxColor} />;
            default:
                return <HomeIcon sx={sxColor} />;
        }
    };

    const getAddressLabel = (type) => {
        if (!type) return 'Home';
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    const cartItems = cart.cartItems || [];
    const itemTotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

    const deliveryFee = itemTotal > 0 ? 40 : 0;
    const platformFee = itemTotal > 0 ? 5 : 0;
    const gst = itemTotal > 0 ? Math.round(itemTotal * 0.05) : 0;

    const totalPay = itemTotal + deliveryFee + platformFee + gst;

    return (
        <div className="min-h-screen bg-[#0f0f0f] pt-28 pb-12 px-4 text-white font-[Poppins]">
            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Cart Items & Addresses */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Cart Items Section */}
                    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">Your Order</h2>
                        {cartItems.length === 0 ? (
                            <div className="text-center py-10">
                                <span className="text-6xl block mb-4">🛒</span>
                                <p className="text-gray-400 text-lg">Your cart is feeling a little empty.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-[#ea580c]/50 transition-colors">
                                        <img 
                                            src={getImageUrl(item.food?.images?.[0])} 
                                            alt={item.food?.name} 
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{item.food?.name}</h3>
                                            <p className="text-[#ea580c] font-bold mt-1">₹{item.totalPrice}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-1">
                                            <IconButton onClick={() => handleQuantityChange(item, -1)} sx={{ color: 'gray', '&:hover':{color: '#ea580c'} }}>
                                                <RemoveCircleOutlineIcon />
                                            </IconButton>
                                            <span className="font-semibold text-lg w-4 text-center">{item.quantity}</span>
                                            <IconButton onClick={() => handleQuantityChange(item, 1)} sx={{ color: 'gray', '&:hover':{color: '#ea580c'} }}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Address Section */}
                    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white tracking-wide">Delivery Address</h2>
                            <Button 
                                variant="outlined" 
                                startIcon={<AddLocationAltIcon />}
                                sx={{ color: '#ea580c', borderColor: '#ea580c', '&:hover': { borderColor: '#c2410c', backgroundColor: 'rgba(234, 88, 12, 0.1)' } }}
                                onClick={() => setIsAddressModalOpen(true)}
                            >
                                Add New
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {allAddresses.map(addr => {
                                const isSelected = selectedAddress?.id === addr.id;
                                return (
                                    <div 
                                        key={addr.id} 
                                        onClick={() => setSelectedAddress(addr)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex gap-3 ${isSelected ? 'border-[#ea580c] bg-[#ea580c]/10' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                                    >
                                        {getAddressIcon(addr.type, isSelected)}
                                        <div className="flex-1">
                                            <h4 className={`font-semibold ${isSelected ? 'text-[#ea580c]' : 'text-gray-300'}`}>{getAddressLabel(addr.type)}</h4>
                                            <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                                                {addr.street ? `${addr.street}, ${addr.city}, ${addr.state}, ${addr.pincode}` : addr.address}
                                            </p>
                                        </div>
                                        {isSelected && <CheckCircleIcon sx={{ color: '#ea580c' }} />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Bill Details */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6 shadow-xl sticky top-24">
                        <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">Bill Details</h2>
                        
                        <div className="space-y-4 text-gray-300">
                            <div className="flex justify-between">
                                <span>Item Total</span>
                                <span className="font-semibold text-white">₹{itemTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-semibold text-white">₹{deliveryFee}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Platform Fee</span>
                                <span className="font-semibold text-white">₹{platformFee}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST & Restaurant Charges</span>
                                <span className="font-semibold text-white">₹{gst}</span>
                            </div>
                        </div>

                        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                        
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-bold text-white">Total Pay</span>
                            <span className="text-2xl font-bold text-[#ea580c]">₹{totalPay}</span>
                        </div>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{ 
                                padding: '1rem',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: '12px',
                                backgroundColor: '#ea580c', 
                                '&:hover': { backgroundColor: '#c2410c' } 
                            }}
                            onClick={() => {
                                if (cartItems.length === 0) {
                                    alert("Your cart is empty. Add some items first!");
                                    return;
                                }
                                if (!selectedAddress) {
                                    alert("Please select a delivery address.");
                                    return;
                                }
                                const restaurantId = cartItems[0]?.food?.restaurant?.id;
                                dispatch(createOrder({
                                    restaurantId,
                                    deliveryAddress: {
                                        street: selectedAddress.street,
                                        city: selectedAddress.city,
                                        state: selectedAddress.state,
                                        zipCode: selectedAddress.pincode
                                    }
                                }));
                                alert("Order placed successfully! Redirecting...");
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>

            </main>

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
                            Save Address
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default Cart;
