import React from 'react';
import { Dashboard, ShoppingBag, RestaurantMenu, Category, EmojiEvents, Settings, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Orders", icon: <ShoppingBag />, path: "/orders" },

    // ✅ NEW
    { title: "Food Items", icon: <RestaurantMenu />, path: "/food" },

    { title: "Food Category", icon: <Category />, path: "/category" },
    { title: "Events", icon: <EmojiEvents />, path: "/events" },
    { title: "Details", icon: <Settings />, path: "/details" },
    { title: "Logout", icon: <Logout />, path: "/" }
];

export const AdminSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
        } else {
            navigate(`/admin/restaurant${item.path}`);
        }
    };

    return (
        <div className="flex flex-col h-full py-6">
            <div className="px-6 mb-8 cursor-pointer" onClick={() => navigate('/')}>
                <h1 className="text-3xl font-bold tracking-wide">
                    Craveo <span className="text-[#ea580c]">Admin</span>
                </h1>
            </div>

            <div className="flex flex-col flex-1 gap-2 px-4">
                {menu.map((item, i) => {
                    const isActive =
                        location.pathname === `/admin/restaurant${item.path}` ||
                        (item.path === '/' && location.pathname === '/admin/restaurant');

                    return (
                        <div
                            key={i}
                            onClick={() => handleNavigate(item)}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                                isActive
                                    ? 'bg-[#ea580c] text-white shadow-lg shadow-[#ea580c]/30'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            {React.cloneElement(item.icon, {
                                sx: { color: isActive ? 'white' : 'inherit' }
                            })}
                            <span className="font-semibold text-[15px]">{item.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};