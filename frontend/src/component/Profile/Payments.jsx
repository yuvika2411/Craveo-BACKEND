import React from "react";
import { Button } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const dummyPayments = [
    {
        id: 301,
        cardLast4: "4242",
        cardName: "Craveo User",
        expiry: "12/28",
        brand: "Visa",
        isDefault: true
    },
    {
        id: 302,
        cardLast4: "8888",
        cardName: "Craveo User",
        expiry: "03/27",
        brand: "Mastercard",
        isDefault: false
    }
];

const Payments = () => {
  return (
    <div className="h-full bg-[#0f0f0f] flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Payment Methods</h1>
            <Button 
                variant="contained" 
                startIcon={<AddCardIcon />}
                sx={{ 
                    backgroundColor: "#ea580c", 
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#c2410c" } 
                }}
            >
                Add Card
            </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {dummyPayments.map(card => (
                <div 
                    key={card.id}
                    className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col min-h-[200px] shadow-lg group ${
                        card.isDefault 
                        ? 'bg-gradient-to-br from-[#1a1310] to-[#25150f] border-2 border-[#ea580c]' 
                        : 'bg-[#151515] border border-white/5 hover:border-white/20'
                    }`}
                >
                    <div className="flex justify-between items-start mb-auto">
                        <div className="flex items-center gap-2">
                            <CreditCardIcon sx={{ color: card.isDefault ? '#ea580c' : '#9ca3af', fontSize: 30 }} />
                            <span className="text-white font-bold tracking-widest text-lg ml-2">{card.brand}</span>
                        </div>
                        {card.isDefault ? (
                            <div className="flex flex-col items-end">
                                <CheckCircleIcon sx={{ color: '#ea580c' }} />
                                <span className="text-[#ea580c] text-xs font-bold mt-1">Primary</span>
                            </div>
                        ) : (
                            <span className="text-gray-500 text-sm font-semibold cursor-pointer hover:text-[#ea580c] transition opacity-0 group-hover:opacity-100">Set Primary</span>
                        )}
                    </div>
                    
                    <div className="my-6 text-gray-300 tracking-[0.2em] text-xl font-medium">
                        **** **** **** {card.cardLast4}
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Card Holder</p>
                            <p className="text-white font-semibold">{card.cardName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Expires</p>
                            <p className="text-white font-semibold">{card.expiry}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Payments;
