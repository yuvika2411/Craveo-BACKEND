import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../State/Authentication/Action";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFavorite = (restaurantId) => {
    dispatch(addToFavorite({ restaurantId }));
  };

  const handleNavigateToRestaurant = (restaurant) => {
    const name = restaurant.name || restaurant.title;
    const city = restaurant.address?.city || 'city';
    navigate(`/restaurant/${city}/${name}/${restaurant.id}`);
  };

  return (
    <div className="h-full bg-[#0f0f0f] rounded-xl flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auth.favorites.map((item) => {
          const restaurant = item.restaurant || item;
          const name = restaurant.name || restaurant.title;
          return (
            <div
              key={restaurant.id}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 border border-white/5 group cursor-pointer"
              onClick={() => handleNavigateToRestaurant(restaurant)}
            >
              <div className="relative h-48 bg-neutral-900 flex items-center justify-center">
                <img
                  src={restaurant.images?.[0] ? (restaurant.images[0].startsWith("http") ? restaurant.images[0] : `${import.meta.env.VITE_API_URL}${restaurant.images[0]}`) : ""}
                  alt={name}
                  className="w-full h-full object-cover z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151515] text-gray-500">
                  <span className="text-4xl mb-2">🍽️</span>
                  <span className="text-sm font-semibold">{name}</span>
                </div>
                {restaurant.open !== undefined && (
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full font-bold shadow-md z-20 ${restaurant.open
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-white"
                      }`}
                  >
                    {restaurant.open ? "Open" : "Closed"}
                  </span>
                )}
              </div>

              <div className="p-5 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-50 group-hover:text-[#ea580c] transition-colors">{name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{restaurant.description}</p>
                </div>
                <div>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(restaurant.id);
                    }} 
                    sx={{ backgroundColor: 'rgba(234,88,12,0.1)', '&:hover': { backgroundColor: 'rgba(234,88,12,0.2)' } }}
                  >
                    <FavoriteIcon sx={{ color: '#ea580c' }} />
                  </IconButton>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Favorites;

