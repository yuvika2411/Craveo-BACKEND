import React from "react";
import OrderCard from "./OrderCard";

const dummyOrders = [
    {
        id: 101,
        restaurantName: "Indian Fast Food",
        restaurantImage: "/images/Restaurants/r1.jpg",
        date: "April 18, 2026 at 7:30 PM",
        totalAmount: 890,
        items: [
            { name: "Punjabi Thali", quantity: 2 },
            { name: "Mango Lassi", quantity: 2 }
        ]
    },
    {
        id: 102,
        restaurantName: "Krishna Restaurant",
        restaurantImage: "/images/Restaurants/r2.jpg",
        date: "April 12, 2026 at 1:15 PM",
        totalAmount: 430,
        items: [
            { name: "Paneer Butter Masala", quantity: 1 },
            { name: "Garlic Naan", quantity: 3 }
        ]
    },
    {
        id: 103,
        restaurantName: "Sita Ram Restaurant",
        restaurantImage: "/images/Restaurants/r4.jpeg",
        date: "April 05, 2026 at 8:45 PM",
        totalAmount: 1250,
        items: [
            { name: "Chicken Biryani", quantity: 2 },
            { name: "Chicken Tikka", quantity: 1 },
            { name: "Coke", quantity: 2 }
        ]
    }
];

const Orders = () => {
  return (
    <div className="min-h-[80vh] bg-[#0f0f0f] flex flex-col">
        <h1 className="text-2xl font-bold text-white mb-6">Your Past Orders</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {dummyOrders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    </div>
  );
};

export default Orders;
