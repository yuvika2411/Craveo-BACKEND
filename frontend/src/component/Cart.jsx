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

const addresses = [
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
    const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);

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
        <div className="font-[Poppins] min-h-screen bg-[#0f0f0f] pt-28 pb-20 px-5 lg:px-10 xl:px-20 text-white selection:bg-[#ea580c] selection:text-white">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 max-w-[1600px] mx-auto">
                
                {/* LEFT SECTION */}
                <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col gap-8">
                    
                    {/* CART ITEMS CARD */}
                    <div className="bg-[#151515] rounded-[2rem] p-6 text-gray-200 md:p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ea580c] to-yellow-500"></div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white">
                                Order Summary
                            </h2>
                            <span className="bg-[#ea580c]/10 border border-[#ea580c]/30 text-[#ea580c] text-sm font-semibold px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.1)]">
                                {cartItems.length} items
                            </span>
                        </div>

                        <div className="space-y-8">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">
                                    Your cart is empty.
                                </div>
                            ) : cartItems.map(item => (
                                <div key={item.id} className="flex gap-5 group">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-inner shrink-0 relative border border-white/10">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                    </div>
                                    <div className="flex flex-col justify-between flex-1 py-1">
                                        <div>
                                            <div className="flex justify-between items-start gap-3">
                                                <h3 className="font-bold text-lg text-gray-50 leading-tight group-hover:text-[#ea580c] transition-colors">{item.name}</h3>
                                                <span className="font-bold text-xl text-white tracking-tight">₹{item.price * item.quantity}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {item.ingredients.map((ing, idx) => (
                                                    <span key={idx} className="bg-white/5 border border-white/10 text-gray-400 text-[10px] uppercase font-medium tracking-wider px-2 py-0.5 rounded-md">
                                                        {ing}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center mt-4">
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

                    {/* BILL DETAILS CARD */}
                    <div className="bg-gradient-to-br from-[#151515] to-[#111111] rounded-[2rem] p-6 md:p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                        
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ea580c]/5 rounded-full blur-3xl pointer-events-none"></div>

                        <h3 className="font-bold text-xl mb-6 text-gray-100 border-b border-white/5 pb-4">Bill Details</h3>
                        <div className="space-y-4 text-[15px] text-gray-400 font-medium">
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
                        
                        <Divider sx={{ borderColor: 'rgba(234,88,12,0.2)', my: 6, borderStyle: 'dashed', borderWidth: '1px' }} />
                        
                        <div className="flex justify-between items-end">
                            <span className="font-bold text-lg text-gray-300 uppercase letter-spacing-wide">Total Pay</span>
                            <span className="font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-yellow-500 shadow-sm leading-none">
                                ₹{totalPay}
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col pt-4 lg:pt-0">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Checkout Details
                        </h2>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-300 mb-6">Delivery Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 content-start">
                        {addresses.map((address) => {
                            const isSelected = selectedAddress === address.id;
                            return (
                                <div 
                                    key={address.id} 
                                    onClick={() => setSelectedAddress(address.id)}
                                    className={`relative bg-[#151515] rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-300 flex flex-col min-h-[220px] border-2 group ${isSelected ? 'border-[#ea580c] shadow-[0_10px_30px_rgba(234,88,12,0.15)] bg-gradient-to-br from-[#151515] to-[#1a110a]' : 'border-white/5 hover:border-white/20 hover:bg-[#1a1a1a]'}`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-5 right-5 text-[#ea580c] bg-[#151515] rounded-full shadow-sm">
                                            <CheckCircleIcon fontSize="medium" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`p-2.5 rounded-2xl transition-colors ${isSelected ? 'bg-gradient-to-br from-[#ea580c] to-[#c2410c] text-white shadow-lg shadow-[#ea580c]/30' : 'bg-[#222] text-gray-400 group-hover:bg-[#333]'}`}>
                                            <HomeIcon fontSize="small" />
                                        </div>
                                        <h4 className={`font-bold text-lg tracking-wide ${isSelected ? 'text-white' : 'text-gray-300'}`}>{address.title}</h4>
                                    </div>
                                    <p className="text-gray-400 text-[15px] leading-relaxed flex-1 pr-6">
                                        {address.address}
                                    </p>
                                </div>
                            );
                        })}

                        {/* Add New Address Card */}
                        <div className="bg-[#0f0f0f] rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[220px] border-2 border-dashed border-white/10 hover:border-[#ea580c]/60 transition-all duration-300 cursor-pointer group hover:bg-[#ea580c]/5">
                            <div className="w-16 h-16 bg-[#1a1a1a] group-hover:bg-[#ea580c] rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:scale-110">
                                <AddLocationAltIcon className="text-gray-400 group-hover:text-white transition-colors duration-300" fontSize="medium" />
                            </div>
                            <h4 className="font-semibold text-lg text-gray-400 group-hover:text-white transition-colors duration-300 tracking-wide">Add New Address</h4>
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
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
                                fontWeight: '900',
                                fontSize: '1.2rem',
                                px: 6,
                                py: 2,
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
        </div>
    );
};

export default Cart;