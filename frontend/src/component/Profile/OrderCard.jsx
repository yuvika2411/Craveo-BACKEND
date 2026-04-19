import React from "react";
import { Button } from "@mui/material";

const OrderCard = ({ order }) => {
    return (
        <div className="bg-[#151515] rounded-2xl p-6 transition-all duration-300 flex flex-col border border-white/5 hover:border-[#ea580c]/50 hover:bg-[#1a1a1a] shadow-lg relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <img src={order.restaurantImage} alt={order.restaurantName} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                        <h4 className="font-bold text-lg text-white group-hover:text-[#ea580c] transition-colors">{order.restaurantName}</h4>
                        <p className="text-gray-400 text-sm mt-0.5">{order.date}</p>
                    </div>
                </div>
                <span className="bg-green-500/10 text-green-500 px-3 py-1 text-xs font-bold rounded-full border border-green-500/20">
                    Delivered
                </span>
            </div>
            
            <div className="py-3 mt-2 border-t border-b border-white/5">
                {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                        <span className="text-gray-300 text-sm">{item.quantity}x {item.name}</span>
                    </div>
                ))}
            </div>
            
            <div className="pt-4 flex justify-between items-center mt-auto">
                <div>
                    <span className="text-gray-400 text-sm">Total Paid</span>
                    <p className="font-bold text-lg text-white">₹{order.totalAmount}</p>
                </div>
                <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                        color: "#ea580c", 
                        borderColor: "#ea580c",
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: "20px",
                        "&:hover": { borderColor: "#c2410c", backgroundColor: "rgba(234,88,12,0.1)" }
                    }}
                >
                    Reorder
                </Button>
            </div>
        </div>
    );
};

export default OrderCard;
