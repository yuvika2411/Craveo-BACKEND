import React from 'react';
import { useSelector } from 'react-redux';

export const Dashboard = () => {
    const { auth } = useSelector(store => store);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">Total Orders</h3>
                    <p className="text-4xl font-bold text-white">0</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">Total Menu Items</h3>
                    <p className="text-4xl font-bold text-white">0</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ea580c]/20 rounded-full blur-2xl"></div>
                    <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">Revenue</h3>
                    <p className="text-4xl font-bold text-[#ea580c]">₹0.00</p>
                </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 shadow-xl text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <span className="text-3xl">🏬</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {auth.user?.fullName}!</h2>
                <p className="text-gray-400 max-w-lg mx-auto">
                    Your restaurant dashboard is currently under construction. Soon, you'll be able to manage your full menu, incoming orders, events, and ingredients directly from here!
                </p>
            </div>
        </div>
    );
};
