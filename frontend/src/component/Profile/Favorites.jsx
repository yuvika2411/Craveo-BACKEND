import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../State/Authentication/Action";

const Favorites = () => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (restaurantId) => {
    dispatch(addToFavorite({ restaurantId }));
  };

  return (
    <div className="min-h-[80vh] bg-[#0f0f0f] rounded-xl flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auth.favorites.map((item) => {
          const restaurant = item.restaurant || item;
          return (
          <div
            key={restaurant.id}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 border border-white/5 group"
          >
            <div className="relative">
              <img
                src={restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : ""}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full font-bold shadow-md ${restaurant.open
                    ? "bg-green-500 text-black"
                    : "bg-red-500 text-white"
                  }`}
              >
                {restaurant.open ? "Open" : "Closed"}
              </span>
            </div>

            <div className="p-5 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-50 group-hover:text-[#ea580c] transition-colors">{restaurant.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{restaurant.description}</p>
              </div>
              <div>
                <IconButton onClick={() => handleRemoveFavorite(restaurant.id)} sx={{ backgroundColor: 'rgba(234,88,12,0.1)', '&:hover': { backgroundColor: 'rgba(234,88,12,0.2)' } }}>
                    <FavoriteIcon sx={{ color: '#ea580c' }} />
                </IconButton>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Favorites;
