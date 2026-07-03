import React from "react";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../State/Restaurant/Action";

const EventCard = ({ event }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel this event booking?")) {
            dispatch(deleteEventAction({ eventId: event.id, jwt }));
        }
    };

    return (
        <div className="bg-[#151515] rounded-2xl p-6 transition-all duration-300 flex flex-col min-h-[180px] border border-white/5 hover:border-[#ea580c]/50 hover:bg-[#1a1a1a] shadow-lg relative overflow-hidden group font-[Poppins]">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-xl text-white group-hover:text-[#ea580c] transition-colors">
                        {event.name || event.eventName}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">
                        {event.restaurant?.name || event.restaurantName}
                    </p>
                </div>
                <div className={`px-3 py-1 text-xs font-bold rounded-full border ${
                    event.status === 'Confirmed' 
                        ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                        : event.status === 'Cancelled'
                        ? 'bg-red-500/10 text-red-500 border-red-500/20'
                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                }`}>
                    {event.status || "Pending"}
                </div>
            </div>

            <div className="space-y-3 mt-2 flex-1">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="p-1.5 rounded-lg bg-[#222] text-[#ea580c]">
                        <EventIcon fontSize="small" />
                    </div>
                    <span>{event.startedAt || event.date} {event.endsAt ? `to ${event.endsAt}` : ''}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="p-1.5 rounded-lg bg-[#222] text-[#ea580c]">
                        <PeopleIcon fontSize="small" />
                    </div>
                    <span>Table for {event.guests} Guests</span>
                </div>
            </div>

            <div className="pt-5 flex gap-3 mt-4 border-t border-white/5 justify-end">
                <Button 
                    variant="text" 
                    size="small"
                    onClick={handleCancel}
                    sx={{ color: "#ef4444", textTransform: "none", fontWeight: "bold", '&:hover': { color: '#b91c1c' } }}
                >
                    Cancel Booking
                </Button>
            </div>
        </div>
    );
};

export default EventCard;
