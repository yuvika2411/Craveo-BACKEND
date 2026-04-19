import React from "react";
import EventCard from "./EventCard";
import { Button } from "@mui/material";

const dummyEvents = [
    {
        id: 201,
        eventName: "Birthday Dinner",
        restaurantName: "Indian Fast Food",
        date: "April 25, 2026",
        time: "8:00 PM",
        guests: 6,
        status: "Confirmed"
    },
    {
        id: 202,
        eventName: "Corporate Lunch",
        restaurantName: "Krishna Restaurant",
        date: "May 02, 2026",
        time: "1:00 PM",
        guests: 12,
        status: "Pending"
    }
];

const Events = () => {
  return (
    <div className="min-h-[80vh] bg-[#0f0f0f] flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Your Events</h1>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: "#ea580c", 
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#c2410c" } 
              }}
            >
              Book Event
            </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {dummyEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    </div>
  );
};

export default Events;
