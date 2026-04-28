import React, { useState } from 'react';
import { Button, Divider, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const initialCart = [
    {
        id: 1,
        name: "Chicken Biryani",
        price: 349,
        quantity: 1,
        image: "/images/Meals/biryani.jpg",
        ingredients: ["Extra Raita", "Salad"]
    },
    {
        id: 2,
        name: "Paneer Tikka Masala",
        price: 299,
        quantity: 2,
        image: "https://www.cookwithmanali.com/wp-content/uploads/2014/04/Paneer-Tikka-Masala-500x500.jpg",
        ingredients: ["Butter Naan", "Mint Chutney"]
    }
];

const initialAddresses = [
    {
        id: 1,
        title: "Home",
        address: "1204, New Shivam Building, Gokuldham Market, Andheri East, Mumbai, 400068, Maharashtra, India"
    },
    {
        id: 2,
        title: "Workspace",
        address: "7th Floor, Tech Park, Mindspace, Malad West, Mumbai, 400064, Maharashtra, India"
    }
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCart);
    const [addressesList, setAddressesList] = useState(initialAddresses);
    const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0].id);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', pincode: '' });

    const handleQuantityChange = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
            }
            return item;
        }).filter(item => item.quantity > 0)); 
    };

    const itemTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliverFee = itemTotal > 0 ? 40 : 0;
    const platformFee = itemTotal > 0 ? 5 : 0;
    const gstAndRestaurantCharges = itemTotal > 0 ? Math.round(itemTotal * 0.05) : 0;
    const totalPay = itemTotal + deliverFee + platformFee + gstAndRestaurantCharges;

    return (
        <div className="font-[Poppins] min-h-screen lg:h-screen lg:overflow-hidden bg-[#0f0f0f] pt-24 pb-6 px-5 lg:px-10 xl:px-20 text-white selection:bg-[#ea580c] selection:text-white flex flex-col">
            <div className="flex flex-col lg:flex-row gap-6 xl:gap-12 max-w-[1600px] mx-auto w-full flex-1 lg:h-full lg:min-h-0">
                
                <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col gap-5 lg:h-full lg:min-h-0">
                    
                    <div className="flex-1 bg-[#151515] rounded-[2rem] p-5 text-gray-200 md:p-6 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col min-h-0">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ea580c] to-yellow-500"></div>
                        <div className="flex items-center justify-between mb-4 shrink-0">
                            <h2 className="text-2xl font-bold text-white">
                                Order Summary
                            </h2>
                            <span className="bg-[#ea580c]/10 border border-[#ea580c]/30 text-[#ea580c] text-sm font-semibold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.1)]">
                                {cartItems.length} items
                            </span>
                        </div>

                        <div className="space-y-4 flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">
                                    Your cart is empty.
                                </div>
                            ) : cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-inner shrink-0 relative border border-white/10">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                    </div>
                                    <div className="flex flex-col justify-between flex-1 py-0.5">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-base text-gray-50 leading-tight group-hover:text-[#ea580c] transition-colors">{item.name}</h3>
                                                <span className="font-bold text-lg text-white tracking-tight">₹{item.price * item.quantity}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                                {item.ingredients.map((ing, idx) => (
                                                    <span key={idx} className="bg-white/5 border border-white/10 text-gray-400 text-[9px] uppercase font-medium tracking-wider px-1.5 py-0.5 rounded-md">
                                                        {ing}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center mt-2">
                                            <div className="flex items-center bg-[#0f0f0f] rounded-full border border-white/10 shadow-inner px-1 py-1">
                                                <IconButton onClick={() => handleQuantityChange(item.id, -1)} size="small" sx={{ color: '#ea580c', '&:hover': { bgcolor: 'rgba(234, 88, 12, 0.1)' } }}>
                                                    <RemoveCircleOutlineIcon fontSize="small" />
                                                </IconButton>
                                                <span className="text-sm font-bold w-7 text-center">{item.quantity}</span>
                                                <IconButton onClick={() => handleQuantityChange(item.id, 1)} size="small" sx={{ color: '#ea580c', '&:hover': { bgcolor: 'rgba(234, 88, 12, 0.1)' } }}>
                                                    <AddCircleOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="shrink-0 bg-gradient-to-br from-[#151515] to-[#111111] rounded-[2rem] p-5 md:p-6 border border-white/5 shadow-2xl relative overflow-hidden">
                        
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ea580c]/5 rounded-full blur-2xl pointer-events-none"></div>

                        <h3 className="font-bold text-lg mb-4 text-gray-100 border-b border-white/5 pb-3">Bill Details</h3>
                        <div className="space-y-3 text-sm text-gray-400 font-medium">
                            <div className="flex justify-between items-center group">
                                <span>Item Total</span>
                                <span className="text-white group-hover:text-[#ea580c] transition-colors">₹{itemTotal}</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span>Delivery Fee</span>
                                <span className="text-white group-hover:text-[#ea580c] transition-colors">₹{deliverFee}</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span>Platform Fee</span>
                                <span className="text-white group-hover:text-[#ea580c] transition-colors">₹{platformFee}</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span>GST & Restaurant Charges</span>
                                <span className="text-white group-hover:text-[#ea580c] transition-colors">₹{gstAndRestaurantCharges}</span>
                            </div>
                        </div>
                        
                        <Divider sx={{ borderColor: 'rgba(234,88,12,0.2)', my: 4, borderStyle: 'dashed', borderWidth: '1px' }} />
                        
                        <div className="flex justify-between items-end">
                            <span className="font-bold text-base text-gray-300 uppercase letter-spacing-wide">Total Pay</span>
                            <span className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-yellow-500 shadow-sm leading-none">
                                ₹{totalPay}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col lg:h-full lg:min-h-0 pt-6 lg:pt-0">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            Checkout Details
                        </h2>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-300 mb-4 shrink-0">Delivery Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 content-start overflow-y-auto pr-2 pb-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                        {addressesList.map((address) => {
                            const isSelected = selectedAddress === address.id;
                            return (
                                <div 
                                    key={address.id} 
                                    onClick={() => setSelectedAddress(address.id)}
                                    className={`relative bg-[#151515] rounded-3xl p-5 md:p-6 cursor-pointer transition-all duration-300 flex flex-col min-h-[180px] border-2 group ${isSelected ? 'border-[#ea580c] shadow-[0_10px_30px_rgba(234,88,12,0.15)] bg-gradient-to-br from-[#151515] to-[#1a110a]' : 'border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]'}`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-5 right-5 text-[#ea580c] bg-[#151515] rounded-full shadow-sm">
                                            <CheckCircleIcon fontSize="medium" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-xl transition-colors ${isSelected ? 'bg-gradient-to-br from-[#ea580c] to-[#c2410c] text-white shadow-lg shadow-[#ea580c]/30' : 'bg-[#222] text-gray-400 group-hover:bg-[#333]'}`}>
                                            <HomeIcon fontSize="small" />
                                        </div>
                                        <h4 className={`font-bold text-base tracking-wide ${isSelected ? 'text-white' : 'text-gray-300'}`}>{address.title}</h4>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed flex-1 pr-4">
                                        {address.address}
                                    </p>
                                </div>
                            );
                        })}

                        <div 
                            onClick={() => setIsAddressModalOpen(true)}
                            className="bg-[#0f0f0f] rounded-3xl p-5 md:p-6 flex flex-col items-center justify-center min-h-[180px] border-2 border-dashed border-white/10 hover:border-[#ea580c]/60 transition-all duration-300 cursor-pointer group hover:bg-[#ea580c]/5"
                        >
                            <div className="w-14 h-14 bg-[#1a1a1a] group-hover:bg-[#ea580c] rounded-xl flex items-center justify-center mb-4 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:scale-110">
                                <AddLocationAltIcon className="text-gray-400 group-hover:text-white transition-colors duration-300" fontSize="medium" />
                            </div>
                            <h4 className="font-semibold text-base text-gray-400 group-hover:text-white transition-colors duration-300 tracking-wide">Add New Address</h4>
                        </div>
                    </div>

                    <div className="mt-auto pt-5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                            <CheckCircleIcon fontSize="small" sx={{ color: '#22c55e' }} />
                            <span>100% Secure Payment Checkout</span>
                        </div>
                        <Button 
                            variant="contained" 
                            size="large"
                            sx={{ 
                                background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                px: 5,
                                py: 1.5,
                                borderRadius: '1.5rem',
                                letterSpacing: '0.5px',
                                textTransform: 'none',
                                boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.5)',
                                width: { xs: '100%', md: 'auto' },
                                '&:hover': { 
                                    background: 'linear-gradient(45deg, #c2410c 30%, #ea580c 90%)',
                                    boxShadow: '0 15px 35px -5px rgba(234, 88, 12, 0.7)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Proceed to Payment
                        </Button>
                    </div>

                </div>
            </div>

            {/* ADDRESS MODAL */}
            {isAddressModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#151515] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative transform transition-all border-t-4 border-t-[#ea580c]">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Add New Address</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Street Address</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ea580c] transition-colors shadow-inner"
                                    placeholder="House No, Building, Street Area"
                                    value={newAddress.street}
                                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">City</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ea580c] transition-colors shadow-inner"
                                        placeholder="City"
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">State</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ea580c] transition-colors shadow-inner"
                                        placeholder="State"
                                        value={newAddress.state}
                                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Pincode</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ea580c] transition-colors shadow-inner"
                                    placeholder="Pincode"
                                    value={newAddress.pincode}
                                    onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <Button 
                                onClick={() => setIsAddressModalOpen(false)}
                                sx={{ color: 'gray', textTransform: 'none', px: 3, borderRadius: '1rem', '&:hover': {backgroundColor: 'rgba(255,255,255,0.05)'} }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={() => {
                                    if(!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.pincode) return;
                                    const fullStr = `${newAddress.street}, ${newAddress.city}, ${newAddress.state}, ${newAddress.pincode}`;
                                    const newEntry = { id: Date.now(), title: "Saved Address", address: fullStr };
                                    setAddressesList([...addressesList, newEntry]);
                                    setSelectedAddress(newEntry.id);
                                    setIsAddressModalOpen(false);
                                    setNewAddress({street: '', city: '', state: '', pincode: ''});
                                }}
                                disabled={!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.pincode}
                                sx={{ 
                                    background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                                    borderRadius: '1rem',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    px: 4,
                                    boxShadow: '0 4px 14px 0 rgba(234, 88, 12, 0.39)',
                                    '&:hover': { background: 'linear-gradient(45deg, #c2410c 30%, #ea580c 90%)' },
                                    '&.Mui-disabled': {
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.3)'
                                    }
                                }}
                            >
                                Save Address
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;