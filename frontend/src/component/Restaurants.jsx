import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from "@mui/material";

const Restaurant = () => {
    const [favorites, setFavorites] = useState([]);

    const restaurants = [
        {
            id: 1,
            name: "Indian Fast Food",
            description: "Crispy Chicken Parmesan",
            image: "/images/Restaurants/r1.jpg",
            isOpen: true,
        },
        {
            id: 2,
            name: "Krishna Restaurant",
            description: "Dive into global flavors",
            image: "/images/Restaurants/r2.jpg",
            isOpen: true,
        },
        {
            id: 3,
            name: "Kathyavadi Restaurant",
            description: "Gujarati food",
            image: "/images/Restaurants/r3.jpg",
            isOpen: false,
        },
        {
            id: 4,
            name: "Sita Ram Restaurant",
            description: "Best Restaurant Of India",
            image: "/images/Restaurants/r4.jpeg",
            isOpen: false,
        },
    ];

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <section className="bg-[#0f0f0f] text-white px-6 py-10 min-h-screen">

            {/* Heading */}
            <h2 className="text-2xl font-semibold font-[Poppins] mb-6 ml-4 md:ml-20">
                Order From Our Handpicked Favorites
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-20 gap-10 mr-20">
                {restaurants.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-40 object-cover"
                            />

                            {/* Badge */}
                            <span
                                className={`absolute top-2 left-2 px-3 py-1 text-xs rounded-full font-semibold ${restaurant.isOpen
                                    ? "bg-green-500 text-black"
                                    : "bg-red-500 text-white"
                                    }`}
                            >
                                {restaurant.isOpen ? "Open" : "Closed"}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {restaurant.name}
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    {restaurant.description}
                                </p>
                            </div>

                            <div>
                                <IconButton onClick={() => toggleFavorite(restaurant.id)}>
                                    {favorites.includes(restaurant.id) ? (
                                        <FavoriteIcon sx={{ color: '#ef4444' }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ color: '#9ca3af' }} />
                                    )}
                                </IconButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Restaurant;