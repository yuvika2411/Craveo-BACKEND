import React from 'react';
import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../Config/logic';

export const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    const handleNavigateToRestaurant = () => {
        navigate(`/restaurant/${item.address?.city || 'city'}/${item.name}/${item.id}`);
    };

    const handleAddToFavorite = () => {
        dispatch(addToFavorite({ restaurantId: item.id }));
    };

    const isFavorited = isPresentInFavorites({
        favorites: auth.favorites || [],
        restaurantId: item.id
    });

    return (
        <Card className="w-full">
            <div 
                className="cursor-pointer relative"
                onClick={handleNavigateToRestaurant}
            >
                <img 
                    className="w-full h-[10rem] rounded-t-md object-cover"
                    src={item.images?.[0] ? (item.images[0].startsWith("http") ? item.images[0] : `${import.meta.env.VITE_API_URL}${item.images[0]}`) : ""}
                    alt={item.name}
                />
                <Chip
                    size="small"
                    className="absolute top-2 left-2"
                    color={item.open ? "success" : "error"}
                    label={item.open ? "Open" : "Closed"}
                />
            </div>
            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className="space-y-1">
                    <p onClick={handleNavigateToRestaurant} className="font-semibold text-lg cursor-pointer">{item.name}</p>
                </div>
                <div>
                    <IconButton onClick={handleAddToFavorite}>
                        {isFavorited ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon sx={{ color: '#9ca3af' }} />}
                    </IconButton>
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;
